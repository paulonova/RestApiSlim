<?php
if (session_status() == PHP_SESSION_NONE) {
    session_set_cookie_params(3600);
    session_start();
}

/**
 * Require the autoload script, this will automatically load our classes
 * so we don't have to require a class everytime we use a class. Evertime
 * you create a new class, remember to runt 'composer update' in the terminal
 * otherwise your classes may not be recognized.
 */
require_once '../../vendor/autoload.php';

/**
 * Here we are creating the app that will handle all the routes. We are storing
 * our database config inside of 'settings'. This config is later used inside of
 * the container inside 'App/container.php'
 */

$container = require '../App/container.php';
$app = new \Slim\App($container);
$auth = require '../App/auth.php';
require '../App/cors.php';


/********************************
 *          ROUTES              *
 ********************************/


$app->get('/', function ($request, $response, $args) {
    /**
     * This fetches the 'index.php'-file inside the 'views'-folder
     */
    // return $this->view->render($response, 'index.php');
    return $this->view->render($response, 'index.php');
});


/**
 * The group is used to group everything connected to the API under '/api'
 * This was done so that we can check if the user is authed when calling '/api'
 * but we don't have to check for auth when calling '/signin'
 */
$app->group('/api', function () use ($app) {

    // GET http://localhost:XXXX/api/todos
    $app->get('/entries', function ($request, $response, $args) {
        $allEntries = $this->blog->getAll();
        /**
         * Wrapping the data when returning as a safety thing
         * https://www.owasp.org/index.php/AJAX_Security_Cheat_Sheet#Server_Side
         */
        return $response->withJson(['data' => $allEntries]);
    });

    // GET http://localhost:XXXX/api/todos/5
    $app->get('/entries/{id}', function ($request, $response, $args) {
        /**
         * {id} is a placeholder for whatever you write after todos. So if we write
         * /todos/4 the {id} will be 4. This gets saved in the $args array
         * $args['id'] === 4
         * The name inside of '$args' must match the placeholder in the url
         * https://www.slimframework.com/docs/v3/objects/router.html#route-placeholders
         */
        $id = $args['id'];
        $singleTodo = $this->blog->getOne($id);
        return $response->withJson(['data' => $singleTodo]);
    });

    $app->post('/entry', function ($request, $response, $args) {
        /**
         * Everything sent in 'body' when doing a POST-request can be
         * extracted with 'getParsedBody()' from the request-object
         * https://www.slimframework.com/docs/v3/objects/request.html#the-request-body
         */
        $body = $request->getParsedBody();
        $newTodo = $this->blog->add($body);
        return $response->withJson(['data' => $newTodo]);
    });
    
    /**DELETE working ****************************************** */
    $app->delete('/entry/{id}', function ($request, $response, $args) {       

        try{
            $id = $args['id'];
            $singleEntry = $this->blog->deleteOne($id);
            return $response->withJson(['data' => true]);
        }catch(PDOException $e){
            return $response->withJson(['data' => false]);
            echo $e->getMessage();
        }        
    });

    /**UPDATE working ****************************************** */
    $app->patch('/entry/{id}', function($request, $response, $args){

        $body = $request->getParsedBody();
        $updateEntry = $this->blog->updateEntry($body, $args['id']);
        return $response->withJson(['data' => $updateEntry]);
    });


    /**GET a single comment by ID ******************************** */
    $app->get('/comment/{id}', function ($request, $response, $args){

        $id = $args['id'];
        $comment = $this->comments->getOneComments($id);
        return $response->withJson(['data' => $comment]);

    });
    /**GET all comment by Entry ID */
    $app->get('/comments/{id}', function ($request, $response, $args){

        $id = $args['id'];
        $comment = $this->comments->getAllCommentsByEntryId($id);
        return $response->withJson(['data' => $comment]);

    });

    //All Comments
    $app->get('/comments', function ($request, $response, $args) {
        $allComments = $this->comments->getAllComments();
        
        return $response->withJson(['data' => $allComments]);
    });

    //POST
    $app->post('/comments', function ($request, $response, $args) {
    
        $body = $request->getParsedBody();
        $comment = $this->comments->addComment($body);
        return $response->withJson(['data' => $comment]);
    });

    /**DELETE COMMENT ****************************************** */
    $app->delete('/comments/delete/{id}', function ($request, $response, $args) {       

        try{
            $id = $args['id'];
            $singleEntry = $this->comments->deleteComment($id);
            return $response->withJson(['data' => true]);
        }catch(PDOException $e){
            return $response->withJson(['data' => false]);
            echo $e->getMessage();
        }        
    });



    /**USERS ****************************************** */
    $app->get('/users/{id}', function ($request, $response, $args){

        $id = $args['id'];
        $user = $this->users->getOneUser($id);
        return $response->withJson(['data' => $user]);

    });

    //GET all users
    $app->get('/users', function ($request, $response, $args) {
        $allUsers = $this->users->getAllUsers();
        
        return $response->withJson(['data' => $allUsers]);
    });



});

$app->run();

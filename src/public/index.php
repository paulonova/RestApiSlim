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

    /** ********************************************************/
    /** ********************ENTRIES ****************************/
    $app->get('/entries', function ($request, $response, $args) {
        $allEntries = $this->blog->getAll();
        return $response->withJson(['data' => $allEntries]);
    });

    $app->get('/entries/{id}', function ($request, $response, $args) {

        $id = $args['id'];
        $singleTodo = $this->blog->getOne($id);
        return $response->withJson(['data' => $singleTodo]);
    });


    $app->get('/entries/user/{id}', function ($request, $response, $args) {
        
        $id = $args['id'];
        $singleTodo = $this->blog->getFromUser($id);
        return $response->withJson(['data' => $singleTodo]);
    });

    $app->post('/entry', function ($request, $response, $args) {
       
        $body = $request->getParsedBody();
        $newTodo = $this->blog->add($body);
        return $response->withJson(['data' => $newTodo]);
    });
    
    /**DELETE ENTRY ****************************************** */
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

    /**UPDATE ENTRY ****************************************** */
    $app->patch('/entry/{id}', function($request, $response, $args){

        $body = $request->getParsedBody();
        $updateEntry = $this->blog->updateEntry($body, $args['id']);
        return $response->withJson(['data' => $updateEntry]);
    });


    /** ********************************************************/
    /** ******************** COMMENTS **************************/

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

    //Skapa kommentar
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

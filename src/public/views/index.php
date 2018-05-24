<?php session_start();?>


<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
    crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
    <script src="/scripts/main.js" defer></script>
  <title>Gruppuppgift - API</title>
</head>

<body>
    
<!-- Alert login error Dialog -->
<?php if(isset($_SESSION["message"])):?>
        
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <?php 
                echo $_SESSION["message"];
                unset($_SESSION["message"]);
            ?>
        </div> 

<?php endif ?>

<!-- Alert login error Dialog -->
<?php if(isset($_SESSION["login"])):?>
        
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <?php 
                echo $_SESSION["login"];
                unset($_SESSION["login"]);
            ?>
        </div> 

<?php endif ?>

<!-- Alert logout  -->
<?php if(isset($_SESSION["logout"])):?>
        
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <?php 
                echo $_SESSION["logout"];
                unset($_SESSION["logout"]);
            ?>
        </div> 

<?php endif ?>

<header class="inlamning_title jumbotron">
    <h1>Gruppuppgift - @appSolut</h1>    
    <h3>Ett API med Slim och PDO</h3> 
    <div class="to_login_container">
        <a class="btn btn-primary" href="../views/login_view.php">Login Page</a>
        <a class="btn btn-warning" href='../logout.php'>Logout here</a>
    </div>  
</header>

<?php if (isset($_SESSION["loggedIn"])): ?>

    <h4 class="welcome_user">Välkomen <?php echo $_SESSION["username"] . " ID: " . $_SESSION["user_id"]?></h4>
    <hr>
    
    <div class="alert alert-success"> <!-- the green header -->
        <h4>De 20 senaste inläggen</h4>
    </div><!-- the green header -->

    <section id="container"> <!-- Show all entries limit 20 -->        
    
    </section> <!-- Show all entries limit 20 -->
    <hr>
    
    <section class="alert alert-success"> <!-- Show a single entry -->
        <h4 for="getOnlyOne">Hämta ut ett specifikt inlägg via EntryID</h4>
        <input id="getOnlyOne" class="form-control" name="getOnlyOne" type="number" value="1" min="1">
        <input id="oneBtn" type="button" class="btn btn-success" value="get only one" >
        <br><br>  
        
        <div id="only_one" class="hidden list-group"> 
            <a class="list-group-item card-content list-group-item-action flex-column align-items-start active">
                <div class="d-flex w-100 justify-content-between">
                    <h3 id="title" class="mb-1">List group item heading</h3>
                    <small id="entry_date">3 days ago</small>
                    <small id="entry_id">Entry id</small>
                </div>
                <p id="entry_content" class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                <small id="created_by">Donec id elit non mi porta.</small>
                <button id="hidde_one" class="btn btn-success">Hidde</button>
            </a>    
        </div>
        <hr>
        <!-- get all entries from a specific user -->
        <h4 for="getFromUser">Hämta ut alla inlägg från en specifik användare</h4>
        <input id="getFromUser" class="form-control" name="getFromUser" type="number" value="1" min="1">
        <input id="getUserEntries" type="submit" class="btn btn-success" value="get entries" >
        <input id="hiddeGetEntries" type="submit" class="btn btn-warning" value="Hidde all" >
        <br><br>

        <div id="errorEntriesContainer" class="alert alert-danger hidden"></div>

        <div id="getEntriesContainer" class="form-control hidden"></div>


    </section> <!-- Show a single entry -->
    <hr>

    <!-- Show all Users -->
    <h4 class="alert alert-warning">Hämta alla användare</h4>
    <section class="user_container">

         <table class="table">
            <thead class="thead-light">
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">User id</th>
                    <th scope="col">Created at</th>
                </tr>
            </thead>
                <tbody id="user-body">
                    <!-- Users info comes here.. -->
                </tbody>
        </table>
    </section>
    <hr>

    <section class="jornal_form"> <!-- Section CREATE ENTRY -->
        <h2 class="saved_articles">Infoga inlägg</h2>
        <form >
            <!-- Title -->
            <input id="entry_title" type="text" name ="entry_title" value= "" class="form-control" 
                    placeholder="Title.." required autofocus> <!-- Title -->

            <!-- Id to update entry -->     
            <input id="update_entry_id" class="form-control" name="getOnlyOne" 
                                placeholder="&#9755; Insert entryID only to update!"
                                type="number"  min="1"  required autofocus>            

            <!-- content -->
            <textarea id="content_entry" class="form-control" name="journal_area"  
                    placeholder="Write yor story here.." rows="4" required autofocus></textarea>  <!-- Journal annotation -->

            <!-- Created By user id -->     
            <input id="entry_created_by" class="form-control" name="getOnlyOne" placeholder="Created by userId"
                                type="number"  min="1" required autofocus>

            <!-- Date -->
            <input id="entry_created_at" type="date" class="form-control" name="entry_created_at" 
                         required autofocus/>  <!-- Date -->            

            <div class="signin_btn"> <!-- Save/update button -->
                <input id="updateEntry" class="btn btn-warning" name="update" value="Uppdatering" type="submit">
                <input id="saveEntry" class="btn btn-lg btn-primary" name="save" value="Spara" type="submit"> 
            </div> <!-- Save/update button -->
            <hr>

            <!-- Save Comments -->
            <div class="form-group">
                <label for="comm_area">Kommentar</label>
                <!-- Comment -->
                <textarea class="form-control" id="comment_area" rows="3"></textarea>
                <!-- Entry id -->     
                <input id="comm_entry_id" class="form-control" name="entry-id" placeholder="Infoga inlägg id"
                                type="number" value="" min="1" required autofocus>
                <!-- Ceated  by -->     
                <input id="comm_created_by" class="form-control" name="comm_created_by" placeholder="Skapad av"
                                type="number" value="" min="1" required autofocus>
                <!-- Created at -->
                <input id="comm_created_at" type="date" class="form-control" name="created-at" 
                        value="" required autofocus/>  <!-- Date -->  
                <div class="signin_btn"> <!-- Save/update button -->
                    <input id="saveComment" class="btn btn-lg btn-primary" name="save" value="Spara Komment" type="submit"> 
                </div> <!-- Save Comments -->               

            </div>
        </form>
    </section><!-- Section CREATE ENTRY -->
    <hr>

    <h4 class="alert alert-success">Sök inlägg via 'Titel'</h4>
    <section class="search_title">        
        <form class="form-control">
            <input id="search_title" onfocus="this.value=''" class="form-control input-group mb-3" type="search" 
                                    placeholder="Search" aria-label="Search">
            <button id="search_btn" class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
        </form>

        <!-- Section SEARCH ENTRY BY TITLE -->
        <div id="search-container" class="search_container list-group hidden">
            <a class="list-group-item card-content list-group-item-action flex-column align-items-start active">
                <div class="d-flex w-100 justify-content-between">
                    <h3 id="search-title" class="mb-1">List group item heading</h3>
                    <small id="search-entry-date">3 days ago</small>
                    <small id="search-entry-id">Entry id</small>
                </div>
                <p id="search-entry-comment" class="mb-1">Donec id elit non mi porta gravida at eget metus.</p>
                <small id="search-created-by">Created by:</small>
                <button id="search-hidde-entry" class="btn btn-success">Hidde</button>
            </a>         
        </div> <!-- Section SEARCH ENTRY BY TITLE -->           
    </section>

    

    <hr>
    
    <section class="alert alert-success"> <!-- Show Comments -->
        <h4>Hämta alla kommentarer från ett inlägg</h4>
        <input id="get-commentId" class="form-control" name="getPostId" type="number" value="1" min="1">
        <!-- By CommentID -->
        <input id="getSingleCommentBtn" type="submit" class="btn btn-success" value="Get Single Comment by CommentID" >
        <!-- By EntryID -->
        <input id="getAllCommentsBtn" type="submit" class="btn btn-success" value="Get All Comments by EntryID" >
        <!-- Hidde all -->
        <input id="hiddeAll" type="submit" class="btn btn-warning" value="Hidde all" >
        <br><br>  
        
        <div id="set-comments" class="list-group hidden"> 
            <!-- Container to set Comment by commentID / only one -->
            <div class= "card comment-card" id="comment_card">
                <div class="card-body comment-body" id="comment_body">
                    <div class="comment-detail" id="comment_detail">
                        <small id="comment_id">Some text</small>
                        <small id="comment_entry_id">Some text</small>
                        <small id="comment_created_by">Some text</small>
                        <small id="comment_created_at">Some text</small>
                    </div>
                        <p class="mb-1" id="comment">Some textSome textSome textSome text</p>
                </div>           
            </div>
        </div>

        <div id="errorComment" class="alert alert-danger hidden"></div> 

        <!-- Container to set Comment by EnttryID / One or more -->
        <div id="set-entryid" class="list-group "> </div> 
    </section> <!-- Show Comments -->

    <hr>

    <!-- Show all Comments -->
    <h4 class="alert alert-success">De 20 senaste Kommentarerna</h4>
    <section id="comment_container" class="comment-container"></section>
       
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    
    
<?php else : ?>

    <h1>You need to login..</h1>

<?php endif; ?>




 <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" 
integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" 
crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" 
integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" 
crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" 
integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" 
crossorigin="anonymous"></script>
</body>

</html>
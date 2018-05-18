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
    <h1>Gruppuppgift - API</h1>    
    <h3>Ett API med Slim and PDO</h3> 
    <div class="to_login_container">
        <a class="btn btn-primary" href="../views/login_view.php">Login Page</a>
        <a class="btn btn-warning" href='../logout.php'>Logout here</a>
    </div>  
</header>

<?php if (isset($_SESSION["loggedIn"])): ?>

    <h4 class="welcome_user">Welcome <?php echo $_SESSION["username"]?></h4>
    <hr>
    
    <div class="alert alert-success"> <!-- the green header -->
        <h4>De 20 senaste inläggen</h4>
    </div><!-- the green header -->

    <section id="container"> <!-- Show all entries limit 20 -->        
    
    </section> <!-- Show all entries limit 20 -->
    <hr>
    
    <section class="alert alert-success"> <!-- Show a single entry -->
        <label for="getOnlyOne">Hämta ut ett enskilt specifikt inlägg:</label>
        <input id="getOnlyOne" class="form-control" name="getOnlyOne" type="number" value="1" min="1">
        <input id="oneBtn" type="button" class="btn btn-success" value="Hämta" >
        <br><br>  

        <div id="only_one" class="hidden list-group"> 
            <a href="#" class="list-group-item card-content list-group-item-action flex-column align-items-start active">
                <div class="d-flex w-100 justify-content-between">
                    <h3 id="entry_title" class="mb-1">List group item heading</h3>
                    <small id="entry_date">3 days ago</small>
                    <small id="entry_id">Entry id</small>
                </div>
                <p id="entry_content" class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                <small id="created_by">Donec id elit non mi porta.</small>
                <button id="hidde_one" class="btn btn-success">Delete</button>
            </a>    
        </div> 

    </section> <!-- Show a single entry -->
    
    
    
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
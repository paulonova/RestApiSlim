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
    <script src="scripts/main.js" defer></script>
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

<div class="inlamning_title jumbotron">
    <h1>Gruppuppgift - API</h1>    
    <h3>Ett API med Slim and PDO</h3> 
    <div class="to_login_container">
        <a class="btn btn-primary" href="../views/login_view.php">Login Page</a>
        <a class="btn btn-warning" href='../logout.php'>Logout here</a>
    </div>  
</div>

<?php if (isset($_SESSION["loggedIn"])): ?>

    <h1>You are inlogad</h1>
    
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
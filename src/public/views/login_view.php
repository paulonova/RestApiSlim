<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
    crossorigin="anonymous">
    <link rel="stylesheet" href="../css/style.css">
    <script src="/scripts/main.js" defer></script>
    <script src="/scripts/register.js" defer></script>
  <title>Gruppuppgift - API</title>
</head>

<body>

    
<!-- Alert login error Dialog -->
<?php if(isset($_GET["message"])):?>
        
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <?php 
                echo $_GET["message"];
                unset($_GET["message"]);
            ?>
        </div> 

<?php endif ?>


<div class="inlamning_title jumbotron">
    <h1>Gruppuppgift - API</h1>    
    <h3>Ett API med Slim and PDO</h3>    
</div>

<main class="container">
  

    <form class="form_signin" action='../login.php' method='POST'>
        <div class="signin_form">
            <h2 class="form-signin-heading">Please sign in</h2>

            <label for="username" class="sr-only">Username</label>
            <input type="text" name ="username" id="inputUsername" class="form-control" placeholder="Username" required autofocus>
            <label for="password" class="sr-only">Password</label>
            <input type="password" name="password" id="sign_password" class="form-control" placeholder="Password" required>

            <div class="signin_btn">
                <button id="register" class="btn btn-warning" type="button">Not registered</button>
                <input class="btn btn-lg btn-primary" name="sub" value="Sign in" type="submit">
            </div>
        </div>       
      </form>

    <hr>

      <form id="register_form" class="form_register hidden" action='/user_register.php' method='POST'>
        <div class="register_form">
            <h2 class="form-signin-heading">Register</h2>

            <label for="username" class="sr-only">Username</label>
            <input type="text" name ="username" id="username" class="form-control" placeholder="Username" required autofocus>
            <label for="password" class="sr-only">Password</label>
            <input type="password" name="password" id="reg_password" class="form-control" placeholder="Password" required>

            <div class="register_btn">
                <input class="btn btn-lg btn-primary" value="Register" type="submit">
            </div>
        </div>       
      </form>
      <hr>

</main>


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
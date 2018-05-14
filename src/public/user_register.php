
<?php

/**REGISTER ALL NEW USERS */
session_start();

$pdo = new PDO(
  "mysql:host=localhost;dbname=db_blog;charset=utf8",
  "root",  //username
  "root", // password
  [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
  ]
);

$hashed = password_hash($_POST["password"], PASSWORD_DEFAULT);

$statement = $pdo->prepare("INSERT INTO users (username, password)
                            VALUES (:username, :password)"
);
$statement_status =  $statement->execute([
  ":username" => $_POST["username"], 
  ":password" => $hashed
]);

if($statement_status){
  $_SESSION["message"] = "Successfully Registered!";
  header('Location: ../views/login_view.php');
}else{
  $_SESSION["message"] = "Register Failed!";
  header('Location: ../views/login_view.php');
}

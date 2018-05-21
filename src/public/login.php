<?php
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

$statement = $pdo->prepare("SELECT * FROM users WHERE username = :username");
$statement->execute([
  "username" => $_POST["username"]
]);

$user = $statement->fetch();

if(password_verify($_POST["password"], $user["password"])){
    header('Location: ../index.php');

    $_SESSION["message"] = "login done";
    $_SESSION["loggedIn"] = true;
    $_SESSION["username"] = $user["username"];
    $_SESSION["user_id"] = $user["userID"];
    $_SESSION["createdAt"] = $user["createdAt"];

}else{
    header('Location: ./views/login_view.php?message=login failed');
}



?>
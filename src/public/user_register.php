
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

$statement = $pdo->prepare("INSERT INTO users (username, password, createdAt)
                            VALUES (:username, :password, :createdAt)"
);
$statement_status =  $statement->execute([
  ":username" => $_POST["username"], 
  ":password" => $hashed,
  ":createdAt" => $_POST["reg_created_at"]
]);

if($statement_status){
  header('Location: ../views/login_view.php?message=Register Created');
}else{
  header('Location: ../views/login_view.php?message=Register Failed');
}

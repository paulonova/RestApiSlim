<?php

session_start();
session_destroy();

$_SESSION["logout"] = "You are logout";

header('Location: ../index.php');

?>
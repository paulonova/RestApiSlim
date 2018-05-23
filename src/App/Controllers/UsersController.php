<?php
namespace App\Controllers;

class Userscontroller{
    private $db;


    public function __construct(\PDO $pdo) {
        $this->db = $pdo;
    }

    public function getAllUsers() {
        $getAllUsers = $this->db->prepare("SELECT * FROM users");
        $getAllUsers->execute();
        $allUsers = $getAllUsers->fetchAll();
        return $allUsers;
    }

    
    public function getOneUser($id){
        $getOneUser = $this->db->prepare("SELECT * FROM users WHERE userID = :id");
        $getOneUser->execute([
          ":id" => $id
        ]);
        // Fetch -> single resource
        $oneUser = $getOneUser->fetch();
        return $oneUser;
    }




}
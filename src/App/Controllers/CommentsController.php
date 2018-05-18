<?php
namespace App\Controllers;

class CommentsController{
    private $db;


    public function __construct(\PDO $pdo) {
        $this->db = $pdo;
    }

    public function getAllComments() {
        $getAllComments = $this->db->prepare("SELECT * FROM comments");
        $getAllComments->execute();
        $allComments = $getAllComments->fetchAll();
        return $allComments;
    }

    
    public function getOneComments($id){
        $getOneComment = $this->db->prepare("SELECT * FROM comments WHERE commentID = :id");
        $getOneComment->execute([
          ":id" => $id
        ]);
        // Fetch -> single resource
        $oneComment = $getOneComment->fetch();
        return $oneComment;
    }



}
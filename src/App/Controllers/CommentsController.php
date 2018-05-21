<?php
namespace App\Controllers;

class CommentsController{
    private $db;


    public function __construct(\PDO $pdo) {
        $this->db = $pdo;
    }

    public function getAllComments() {
        $getAllComments = $this->db->prepare("SELECT * FROM comments LIMIT 20");
        $getAllComments->execute();
        $allComments = $getAllComments->fetchAll();
        return $allComments;
    }

    
    public function getOneComments($id){
        $getOneComment = $this->db->prepare("SELECT * FROM comments WHERE entryID = :id");
        $getOneComment->execute([":id" => $id]);
        return $getOneComment->fetch();
    }

    public function addComment($comments){

        $addOne = $this->db->prepare('INSERT INTO comments (entryID, content, createdBy, createdAt) 
                                      VALUES (:entryID, :content, :createdBy, :createdAt)');
        $addOne->execute([
            ':entryID' => $comments['entryID'],
            ':content' => $comments['content'],
            ':createdBy' => $comments['createdBy'],
            ':createdAt' => $comments['createdAt']
            
            ]);

            return [
            // 'id' => (int)$this->db->lastInsertId(),
            ':entryID' => $comments['entryID'],
            ':content' => $comments['content'],
            ':createdBy' => $comments['createdBy'],
            ':createdAt' => $comments['createdAt']
        ];
    }


    public function deleteComment($id){

        $deleteComment = $this->db->prepare('DELETE FROM comments WHERE commentID = :id');
        $deleteComment->execute([':id' => $id]);

    }



}
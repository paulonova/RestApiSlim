<?php
namespace App\Controllers;

class EntriesController{
    private $db;


    public function __construct(\PDO $pdo) {
        $this->db = $pdo;
    }

    //Working..
    public function getAll() {
        $getAll = $this->db->prepare('SELECT * FROM entries LIMIT 20');
        $getAll->execute();
        return $getAll->fetchAll();
    }

    //Working
    public function getOne($id){
        $getOne = $this->db->prepare('SELECT * FROM entries WHERE entryID = :id');
        $getOne->execute([':id' => $id]);
        return $getOne->fetch();
    }

    public function add($blog){

        $addOne = $this->db->prepare('INSERT INTO entries (title, content, createdBy, createdAt) 
                                      VALUES (:title, :content, :createdBy, :createdAt)');
        $addOne->execute([
            ':title' => $blog['title'],
            ':content' => $blog['content'],
            ':createdBy' => $blog['createdBy'],
            ':createdAt' => $blog['createdAt']
            
            ]);

            return [
            // 'id' => (int)$this->db->lastInsertId(),
            ':title' => $blog['title'],
            ':content' => $blog['content'],
            ':createdBy' => $blog['createdBy'],
            ':createdAt' => $blog['createdAt']
        ];
    }

    public function updateEntry($blog, $id){

        $update = $this->db->prepare('UPDATE entries 
                                      SET title= :title, content= :content, createdBy= :createdBy, createdAt= :createdAt
                                      WHERE entryID= :entryID');
        $update->execute([
            ':title' => $blog['title'],
            ':content' => $blog['content'],
            ':createdBy' => $blog['createdBy'],
            ':createdAt' => $blog['createdAt'],
            ':entryID' => $id         
            ]);

        
        return [
            // 'id' => (int)$this->db->lastInsertId(),
            ':title' => $blog['title'],
            ':content' => $blog['content'],
            ':createdBy' => $blog['createdBy'],
            ':createdAt' => $blog['createdAt'],
            ':entryID' => $id
        ];

    }

    public function deleteOne($id){

        $deleteOne = $this->db->prepare('DELETE FROM entries WHERE entryID = :id');
        $deleteOne->execute([':id' => $id]);

    }



}
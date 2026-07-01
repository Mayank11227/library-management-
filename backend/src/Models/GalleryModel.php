<?php
namespace App\Models;

use App\Config\Database;
use PDO;

class GalleryModel {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM gallery ORDER BY created_at DESC");
        return $stmt->fetchAll();
    }

    public function findById(int $id) {
        $stmt = $this->db->prepare("SELECT * FROM gallery WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function create(array $data) {
        $stmt = $this->db->prepare("INSERT INTO gallery (title, description, image_url) VALUES (:title, :description, :image_url)");
        $stmt->execute([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'image_url' => $data['image_url']
        ]);
        return $this->db->lastInsertId();
    }

    public function delete(int $id) {
        $stmt = $this->db->prepare("DELETE FROM gallery WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->rowCount() > 0;
    }
}

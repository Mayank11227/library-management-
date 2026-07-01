<?php
namespace App\Models;

use App\Config\Database;
use PDO;

class EnquiryModel {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM enquiries ORDER BY created_at DESC");
        return $stmt->fetchAll();
    }

    public function create(array $data) {
        $sql = "INSERT INTO enquiries (name, phone, course_target, status) VALUES (:name, :phone, :course_target, 'New')";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'name' => $data['name'],
            'phone' => $data['phone'],
            'course_target' => $data['course_target'] ?? null
        ]);
        return $this->db->lastInsertId();
    }

    public function updateStatus(int $id, string $status) {
        $stmt = $this->db->prepare("UPDATE enquiries SET status = :status WHERE id = :id");
        return $stmt->execute(['status' => $status, 'id' => $id]);
    }
}

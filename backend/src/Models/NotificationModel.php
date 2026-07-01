<?php
namespace App\Models;

use App\Config\Database;
use PDO;

class NotificationModel {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function create(array $data) {
        $sql = "INSERT INTO notifications (user_type, user_id, title, message, type, is_read) 
                VALUES (:user_type, :user_id, :title, :message, :type, :is_read)";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'user_type' => $data['user_type'] ?? 'student',
            'user_id' => $data['user_id'] ?? null,
            'title' => $data['title'],
            'message' => $data['message'],
            'type' => $data['type'] ?? 'info',
            'is_read' => 0
        ]);
        return $this->db->lastInsertId();
    }

    public function getAll(int $limit = 50, int $offset = 0) {
        $query = "SELECT * FROM notifications ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue('limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue('offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function getForStudent(int $studentId, int $limit = 50, int $offset = 0) {
        $query = "SELECT * FROM notifications 
                  WHERE (user_type = 'student' AND (user_id IS NULL OR user_id = :student_id))
                     OR (user_type = 'all') 
                  ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue('student_id', $studentId, PDO::PARAM_INT);
        $stmt->bindValue('limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue('offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function markAsRead(int $id, int $studentId) {
        $sql = "UPDATE notifications SET is_read = 1 WHERE id = :id AND user_id = :student_id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute(['id' => $id, 'student_id' => $studentId]);
    }
}

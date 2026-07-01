<?php
namespace App\Models;

use App\Config\Database;
use PDO;

class MembershipModel {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function getAll() {
        $stmt = $this->db->query("
            SELECT m.*, s.name as student_name, s.student_id_card, p.name as plan_name 
            FROM memberships m 
            JOIN students s ON m.student_id = s.id 
            JOIN membership_plans p ON m.plan_id = p.id
            ORDER BY m.created_at DESC
        ");
        return $stmt->fetchAll();
    }

    public function getPlans() {
        $stmt = $this->db->query("SELECT * FROM membership_plans WHERE status = 1");
        return $stmt->fetchAll();
    }

    public function create(array $data) {
        $sql = "INSERT INTO memberships (student_id, plan_id, start_date, end_date, status) 
                VALUES (:student_id, :plan_id, :start_date, :end_date, 'Active')";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'student_id' => $data['student_id'],
            'plan_id' => $data['plan_id'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date']
        ]);
        return $this->db->lastInsertId();
    }

    public function renew(int $id, string $newEndDate) {
        $sql = "UPDATE memberships SET end_date = :end_date, status = 'Active' WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute(['end_date' => $newEndDate, 'id' => $id]);
    }
}

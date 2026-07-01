<?php
namespace App\Models;

use App\Config\Database;
use PDO;

class PaymentModel {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function getAll(int $limit = 50, int $offset = 0) {
        $stmt = $this->db->prepare("
            SELECT p.*, s.name as student_name 
            FROM payment_transactions p 
            LEFT JOIN students s ON p.student_id = s.id 
            ORDER BY p.transaction_date DESC
            LIMIT :limit OFFSET :offset
        ");
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function create(array $data) {
        $txnId = 'TXN-' . rand(10000, 99999) . time();
        $sql = "INSERT INTO payment_transactions (id, student_id, type, category, amount, payment_method, status) 
                VALUES (:id, :student_id, :type, :category, :amount, :payment_method, :status)";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'id' => $txnId,
            'student_id' => $data['student_id'] ?? null,
            'type' => $data['type'] ?? 'Income',
            'category' => $data['category'],
            'amount' => $data['amount'],
            'payment_method' => $data['payment_method'] ?? 'Cash',
            'status' => $data['status'] ?? 'Completed'
        ]);
        return $txnId;
    }

    public function updateStatus(string $txnId, string $status) {
        $stmt = $this->db->prepare("UPDATE payment_transactions SET status = :status WHERE id = :id");
        return $stmt->execute(['status' => $status, 'id' => $txnId]);
    }
}

<?php
namespace App\Models;

use App\Config\Database;
use PDO;

class SeatModel {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function getAll(string $floor = '', string $status = '') {
        $query = "SELECT * FROM seat_master WHERE 1=1";
        $params = [];

        if (!empty($floor)) {
            $query .= " AND floor = :floor";
            $params['floor'] = $floor;
        }
        if (!empty($status)) {
            $query .= " AND status = :status";
            $params['status'] = $status;
        }

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public function allocate(string $seatId, int $studentId) {
        $this->db->beginTransaction();
        try {
            // Check if seat is available
            $stmt = $this->db->prepare("SELECT status FROM seat_master WHERE id = :id FOR UPDATE");
            $stmt->execute(['id' => $seatId]);
            $seat = $stmt->fetch();

            if (!$seat || $seat['status'] !== 'available') {
                $this->db->rollBack();
                return ['success' => false, 'message' => 'Seat is not available'];
            }

            // Remove student from any currently active seat (Business Rule: one active seat at a time)
            $stmt = $this->db->prepare("UPDATE seat_master SET status = 'available', current_student_id = NULL WHERE current_student_id = :student_id");
            $stmt->execute(['student_id' => $studentId]);

            // Allocate new seat
            $stmt = $this->db->prepare("UPDATE seat_master SET status = 'occupied', current_student_id = :student_id WHERE id = :seat_id");
            $stmt->execute(['student_id' => $studentId, 'seat_id' => $seatId]);

            $this->db->commit();
            return ['success' => true, 'message' => 'Seat allocated successfully'];
        } catch (\Exception $e) {
            $this->db->rollBack();
            return ['success' => false, 'message' => 'Database error during allocation'];
        }
    }

    public function release(string $seatId) {
        $stmt = $this->db->prepare("UPDATE seat_master SET status = 'available', current_student_id = NULL WHERE id = :id");
        return $stmt->execute(['id' => $seatId]);
    }

    public function updateStatus(string $seatId, string $status) {
        $stmt = $this->db->prepare("UPDATE seat_master SET status = :status WHERE id = :id");
        return $stmt->execute(['status' => $status, 'id' => $seatId]);
    }
}

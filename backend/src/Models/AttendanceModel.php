<?php
namespace App\Models;

use App\Config\Database;
use PDO;

class AttendanceModel {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function getTodayLog() {
        $today = date('Y-m-d');
        $stmt = $this->db->prepare("
            SELECT a.*, s.name as student_name, s.student_id_card 
            FROM attendance a 
            JOIN students s ON a.student_id = s.id 
            WHERE a.date = :date
            ORDER BY a.check_in DESC
        ");
        $stmt->execute(['date' => $today]);
        return $stmt->fetchAll();
    }

    public function getStudentAttendance(int $studentId) {
        $stmt = $this->db->prepare("
            SELECT * FROM attendance 
            WHERE student_id = :student_id 
            ORDER BY date DESC 
            LIMIT 30
        ");
        $stmt->execute(['student_id' => $studentId]);
        return $stmt->fetchAll();
    }

    public function processScan(int $studentId, string $scanType) {
        $today = date('Y-m-d');
        $currentTime = date('H:i:s');

        $this->db->beginTransaction();
        try {
            // Check current active check-in (without check-out) for today
            $stmt = $this->db->prepare("SELECT id, check_in FROM attendance WHERE student_id = :student_id AND date = :date AND check_out IS NULL LIMIT 1");
            $stmt->execute(['student_id' => $studentId, 'date' => $today]);
            $activeRecord = $stmt->fetch();

            if ($scanType === 'in') {
                if ($activeRecord) {
                    $this->db->rollBack();
                    return ['success' => false, 'message' => 'Already checked in without a check-out'];
                }
                // Check in
                $stmt = $this->db->prepare("INSERT INTO attendance (student_id, date, check_in) VALUES (:student_id, :date, :time)");
                $stmt->execute(['student_id' => $studentId, 'date' => $today, 'time' => $currentTime]);
                
                $this->db->commit();
                return ['success' => true, 'message' => 'Checked in successfully'];
            } else if ($scanType === 'out') {
                if (!$activeRecord) {
                    $this->db->rollBack();
                    return ['success' => false, 'message' => 'No active check-in found to check out from'];
                }
                
                // Check out
                $stmt = $this->db->prepare("UPDATE attendance SET check_out = :time WHERE id = :id");
                $stmt->execute(['time' => $currentTime, 'id' => $activeRecord['id']]);

                // Calculate duration in minutes for study_sessions
                $checkInTime = strtotime($today . ' ' . $activeRecord['check_in']);
                $checkOutTime = strtotime($today . ' ' . $currentTime);
                $durationMinutes = round(($checkOutTime - $checkInTime) / 60);

                // Add to study_sessions
                $stmt = $this->db->prepare("INSERT INTO study_sessions (student_id, session_date, duration_minutes) VALUES (:student_id, :date, :duration)");
                $stmt->execute(['student_id' => $studentId, 'date' => $today, 'duration' => $durationMinutes]);

                $this->db->commit();
                return ['success' => true, 'message' => 'Checked out successfully. Session time: ' . $durationMinutes . ' minutes.'];
            }

            $this->db->rollBack();
            return ['success' => false, 'message' => 'Invalid scan type'];
        } catch (\Exception $e) {
            $this->db->rollBack();
            return ['success' => false, 'message' => 'Database error during scan'];
        }
    }
}

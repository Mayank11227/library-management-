<?php
namespace App\Models;

use App\Config\Database;
use PDO;

class StudySessionModel {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function getStudentStats(int $studentId) {
        $today = date('Y-m-d');
        
        // Calculate the start of the week (Monday)
        $startOfWeek = date('Y-m-d', strtotime('monday this week'));
        
        // Calculate the start of the month
        $startOfMonth = date('Y-m-01');

        $stats = [
            'today_minutes' => 0,
            'weekly_minutes' => 0,
            'monthly_minutes' => 0,
            'weekly_data' => []
        ];

        // Today
        $stmt = $this->db->prepare("SELECT SUM(duration_minutes) as total FROM study_sessions WHERE student_id = :id AND session_date = :date");
        $stmt->execute(['id' => $studentId, 'date' => $today]);
        $stats['today_minutes'] = $stmt->fetchColumn() ?: 0;

        // Weekly
        $stmt = $this->db->prepare("SELECT SUM(duration_minutes) as total FROM study_sessions WHERE student_id = :id AND session_date >= :start_date");
        $stmt->execute(['id' => $studentId, 'start_date' => $startOfWeek]);
        $stats['weekly_minutes'] = $stmt->fetchColumn() ?: 0;

        // Monthly
        $stmt = $this->db->prepare("SELECT SUM(duration_minutes) as total FROM study_sessions WHERE student_id = :id AND session_date >= :start_date");
        $stmt->execute(['id' => $studentId, 'start_date' => $startOfMonth]);
        $stats['monthly_minutes'] = $stmt->fetchColumn() ?: 0;

        // Weekly Chart Data (Mon - Sun)
        $stmt = $this->db->prepare("SELECT session_date, SUM(duration_minutes) as total FROM study_sessions WHERE student_id = :id AND session_date >= :start_date GROUP BY session_date");
        $stmt->execute(['id' => $studentId, 'start_date' => $startOfWeek]);
        $dailyData = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);

        $days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        $currentDate = $startOfWeek;
        
        foreach ($days as $day) {
            $minutes = $dailyData[$currentDate] ?? 0;
            $stats['weekly_data'][] = [
                'day' => $day,
                'hours' => round($minutes / 60, 1)
            ];
            $currentDate = date('Y-m-d', strtotime($currentDate . ' + 1 day'));
        }

        return $stats;
    }
}

<?php
namespace App\Controllers;

use App\Models\AttendanceModel;
use App\Models\StudentModel;
use App\Middleware\AuthMiddleware;

class AttendanceController extends BaseController {
    
    private AttendanceModel $attendanceModel;

    public function __construct() {
        $this->attendanceModel = new AttendanceModel();
    }

    public function today() {
        AuthMiddleware::authenticate('admin'); // Only admin sees the global today log
        $logs = $this->attendanceModel->getTodayLog();
        $this->jsonResponse(['status' => 'success', 'data' => $logs]);
    }

    public function scan() {
        // Can be triggered by Admin scanner or Student app
        AuthMiddleware::authenticate(); 
        $body = $this->getJsonBody();

        // In a real scenario, qr_data would be decrypted to find the student ID.
        // For simplicity, we assume qr_data just contains the student_id or we pass student_id directly.
        $studentId = $body['student_id'] ?? null;
        $scanType = $body['scan_type'] ?? ''; // 'in' or 'out'

        if (!$studentId || !in_array($scanType, ['in', 'out'])) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Invalid payload'], 400);
        }

        $result = $this->attendanceModel->processScan((int)$studentId, $scanType);

        if ($result['success']) {
            $this->jsonResponse(['status' => 'success', 'message' => $result['message']]);
        }
        $this->jsonResponse(['status' => 'error', 'message' => $result['message']], 400);
    }

    public function studentAttendance() {
        $user = AuthMiddleware::authenticate('student');
        
        $logs = $this->attendanceModel->getStudentAttendance($user->id);
        $this->jsonResponse(['status' => 'success', 'data' => $logs]);
    }
}

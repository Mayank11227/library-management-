<?php
namespace App\Controllers;

use App\Models\SeatModel;
use App\Middleware\AuthMiddleware;

class SeatController extends BaseController {
    
    private SeatModel $seatModel;

    public function __construct() {
        $this->seatModel = new SeatModel();
    }

    public function index() {
        AuthMiddleware::authenticate(); // Both admin and student can view seats
        $floor = $_GET['floor'] ?? '';
        $status = $_GET['status'] ?? '';

        $seats = $this->seatModel->getAll($floor, $status);
        $this->jsonResponse(['status' => 'success', 'data' => $seats]);
    }

    public function allocate($id) {
        AuthMiddleware::authenticate('admin'); // Only admin can allocate manually
        $body = $this->getJsonBody();
        $studentId = $body['student_id'] ?? null;

        if (!$studentId) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Student ID is required'], 400);
        }

        $result = $this->seatModel->allocate($id, (int)$studentId);

        if ($result['success']) {
            $this->jsonResponse(['status' => 'success', 'message' => $result['message']]);
        }
        $this->jsonResponse(['status' => 'error', 'message' => $result['message']], 400);
    }

    public function release($id) {
        AuthMiddleware::authenticate('admin');

        $released = $this->seatModel->release($id);
        if ($released) {
            $this->jsonResponse(['status' => 'success', 'message' => 'Seat released successfully']);
        }
        $this->jsonResponse(['status' => 'error', 'message' => 'Failed to release seat'], 400);
    }

    public function updateStatus($id) {
        AuthMiddleware::authenticate('admin');
        $body = $this->getJsonBody();
        $status = $body['status'] ?? '';

        $validStatuses = ['available', 'occupied', 'reserved', 'maintenance', 'blocked'];
        if (!in_array($status, $validStatuses)) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Invalid status'], 400);
        }

        $updated = $this->seatModel->updateStatus($id, $status);
        if ($updated) {
            $this->jsonResponse(['status' => 'success', 'message' => 'Seat status updated']);
        }
        $this->jsonResponse(['status' => 'error', 'message' => 'Failed to update seat status'], 400);
    }
}

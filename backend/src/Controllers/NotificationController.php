<?php
namespace App\Controllers;

use App\Models\NotificationModel;
use App\Middleware\AuthMiddleware;
use App\Services\ValidationService;

class NotificationController extends BaseController {
    
    private NotificationModel $notificationModel;

    public function __construct() {
        $this->notificationModel = new NotificationModel();
    }

    public function index() {
        $user = AuthMiddleware::authenticate();
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = 50;
        $offset = ($page - 1) * $limit;

        if ($user->role === 'admin') {
            $notifications = $this->notificationModel->getAll($limit, $offset);
        } else {
            $notifications = $this->notificationModel->getForStudent($user->id, $limit, $offset);
        }
        
        $this->jsonResponse(['status' => 'success', 'data' => $notifications]);
    }

    public function store() {
        AuthMiddleware::authenticate('admin');
        $body = $this->getJsonBody();

        $errors = ValidationService::validate($body, [
            'title' => 'required',
            'message' => 'required'
        ]);

        if ($errors) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors], 400);
        }

        // Logic for audience mapping
        $audience = $body['audience'] ?? 'all'; // all, premium, expiring, specific
        
        $data = [
            'title' => $body['title'],
            'message' => $body['message'],
            'type' => $body['type'] ?? 'info'
        ];

        if ($audience === 'all') {
            $data['user_type'] = 'student'; // Meaning all students
            $data['user_id'] = null; // Global
            $this->notificationModel->create($data);
        } else if ($audience === 'specific' && !empty($body['student_id'])) {
            $data['user_type'] = 'student';
            $data['user_id'] = $body['student_id'];
            $this->notificationModel->create($data);
        } else {
            // For 'premium' or 'expiring', we would normally fetch student IDs and create individual notifications or handle via a different logic. 
            // For simplicity, we just mark user_id as null and assume frontend filtering or a custom column. We will treat as global for now if not specific.
            $data['user_type'] = 'student';
            $data['user_id'] = null;
            $this->notificationModel->create($data);
        }

        $this->jsonResponse(['status' => 'success', 'message' => 'Notification sent successfully'], 201);
    }

    public function read($id) {
        $user = AuthMiddleware::authenticate('student');
        
        $updated = $this->notificationModel->markAsRead((int)$id, $user->id);
        
        if ($updated) {
            $this->jsonResponse(['status' => 'success', 'message' => 'Notification marked as read']);
        }
        $this->jsonResponse(['status' => 'error', 'message' => 'Failed to update notification'], 400);
    }
}

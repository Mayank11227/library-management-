<?php
namespace App\Controllers;

use App\Models\StudentModel;
use App\Middleware\AuthMiddleware;
use App\Services\ValidationService;

class StudentController extends BaseController {
    
    private StudentModel $studentModel;

    public function __construct() {
        $this->studentModel = new StudentModel();
    }

    public function index() {
        AuthMiddleware::authenticate('admin'); // Only admin can list all students
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = 50;
        $offset = ($page - 1) * $limit;
        $search = $_GET['search'] ?? '';
        $status = $_GET['status'] ?? '';

        $students = $this->studentModel->getAll($limit, $offset, $search, $status);
        $this->jsonResponse(['status' => 'success', 'data' => $students]);
    }

    public function show($id) {
        $user = AuthMiddleware::authenticate();
        // A student can only view their own profile, unless they are admin
        if ($user->role === 'student' && $user->id != $id) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Forbidden'], 403);
        }

        $student = $this->studentModel->findById((int)$id);
        if (!$student) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Student not found'], 404);
        }

        unset($student['password']);
        $this->jsonResponse(['status' => 'success', 'data' => $student]);
    }

    public function store() {
        AuthMiddleware::authenticate('admin');
        $body = $this->getJsonBody();

        $errors = ValidationService::validate($body, [
            'student_id_card' => 'required',
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'phone' => 'required'
        ]);

        if ($errors) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors], 400);
        }

        // Handle File Upload
        if (isset($_FILES['profile_image']) && $_FILES['profile_image']['error'] === UPLOAD_ERR_OK) {
            $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            $maxSize = 2 * 1024 * 1024; // 2MB

            if (!in_array($_FILES['profile_image']['type'], $allowedTypes)) {
                $this->jsonResponse(['status' => 'error', 'message' => 'Invalid file type. Only JPG, PNG, and WebP are allowed.'], 400);
            }
            if ($_FILES['profile_image']['size'] > $maxSize) {
                $this->jsonResponse(['status' => 'error', 'message' => 'File size exceeds 2MB limit.'], 400);
            }

            $uploadPath = __DIR__ . '/../../public/uploads/';
            if (!is_dir($uploadPath)) mkdir($uploadPath, 0777, true);
            
            $ext = pathinfo($_FILES['profile_image']['name'], PATHINFO_EXTENSION);
            $filename = time() . '_' . bin2hex(random_bytes(8)) . '.' . $ext;
            
            if (move_uploaded_file($_FILES['profile_image']['tmp_name'], $uploadPath . $filename)) {
                $body['profile_image'] = '/uploads/' . $filename;
            }
        }

        try {
            $id = $this->studentModel->create($body);
            $this->jsonResponse(['status' => 'success', 'message' => 'Student created', 'id' => $id], 201);
        } catch (\PDOException $e) {
            if (strpos($e->getMessage(), 'Duplicate entry') !== false) {
                $this->jsonResponse(['status' => 'error', 'message' => 'Email or Student ID already exists'], 400);
            }
            throw $e; // Let the global exception handler catch it
        }
    }

    public function update($id) {
        $user = AuthMiddleware::authenticate();
        if ($user->role === 'student' && $user->id != $id) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Forbidden'], 403);
        }

        $body = $this->getJsonBody();
        $updated = $this->studentModel->update((int)$id, $body);

        if ($updated) {
            $this->jsonResponse(['status' => 'success', 'message' => 'Student updated']);
        }
        $this->jsonResponse(['status' => 'error', 'message' => 'Update failed or no changes made'], 400);
    }

    public function destroy($id) {
        AuthMiddleware::authenticate('admin');
        
        $deleted = $this->studentModel->delete((int)$id);
        if ($deleted) {
            $this->jsonResponse(['status' => 'success', 'message' => 'Student suspended/deleted']);
        }
        $this->jsonResponse(['status' => 'error', 'message' => 'Failed to delete student'], 400);
    }
}

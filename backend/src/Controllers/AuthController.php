<?php
namespace App\Controllers;

use App\Models\AdminModel;
use App\Models\StudentModel;
use App\Services\JWTService;
use App\Middleware\RateLimitMiddleware;
use App\Services\ValidationService;
use App\Config\Database;

class AuthController extends BaseController {
    public function login() {
        RateLimitMiddleware::checkLimit(5, 60);
        $body = $this->getJsonBody();
        
        $errors = ValidationService::validate($body, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($errors) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors], 400);
        }

        $email = $body['email'];
        $password = $body['password'];
        $role = $body['role'] ?? 'student';

        $user = null;
        if ($role === 'admin') {
            $adminModel = new AdminModel();
            $user = $adminModel->findByEmail($email);
        } else {
            $studentModel = new StudentModel();
            $user = $studentModel->findByEmail($email);
        }

        if (!$user || !password_verify($password, $user['password'])) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Invalid credentials'], 401);
        }

        if ($role === 'student' && $user['status'] !== 'Active') {
            $this->jsonResponse(['status' => 'error', 'message' => 'Account is not active'], 403);
        }

        unset($user['password']); // don't send password hash back

        $payload = [
            'id' => $user['id'],
            'email' => $user['email'],
            'role' => $role,
            'iat' => time(),
            'exp' => time() + (86400 * 7) // 7 days expiration
        ];

        $token = JWTService::encode($payload);

        $this->jsonResponse([
            'status' => 'success',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function logout() {
        $authHeader = null;
        if (isset($_SERVER['Authorization'])) {
            $authHeader = trim($_SERVER['Authorization']);
        } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $authHeader = trim($_SERVER['HTTP_AUTHORIZATION']);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            if (isset($requestHeaders['Authorization'])) {
                $authHeader = trim($requestHeaders['Authorization']);
            }
        }

        if ($authHeader && preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $token = $matches[1];
            $db = Database::getConnection();
            $stmt = $db->prepare("INSERT IGNORE INTO token_blacklist (token) VALUES (:token)");
            $stmt->execute(['token' => $token]);
        }

        $this->jsonResponse(['status' => 'success', 'message' => 'Logged out successfully']);
    }
}

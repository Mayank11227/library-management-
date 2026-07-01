<?php
namespace App\Middleware;

use App\Services\JWTService;

class AuthMiddleware {
    public static function authenticate(string $requiredRole = null) {
        $authHeader = null;
        if (isset($_SERVER['Authorization'])) {
            $authHeader = trim($_SERVER['Authorization']);
        } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) { // Nginx or fast CGI
            $authHeader = trim($_SERVER['HTTP_AUTHORIZATION']);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            if (isset($requestHeaders['Authorization'])) {
                $authHeader = trim($requestHeaders['Authorization']);
            }
        }
        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Unauthorized: Missing or invalid token']);
            exit;
        }

        $token = $matches[1];
        $payload = JWTService::decode($token);

        if (!$payload) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Unauthorized: Invalid or expired token']);
            exit;
        }

        // Check Blacklist
        $db = \App\Config\Database::getConnection();
        $stmt = $db->prepare("SELECT id FROM token_blacklist WHERE token = :token");
        $stmt->execute(['token' => $token]);
        if ($stmt->fetch()) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Unauthorized: Token has been revoked']);
            exit;
        }

        if ($requiredRole && (!isset($payload->role) || $payload->role !== $requiredRole)) {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Forbidden: Insufficient permissions']);
            exit;
        }

        // Attach user info to global or request (for simplicity, we'll use a global array or property)
        $GLOBALS['user'] = $payload;

        return $payload;
    }
}

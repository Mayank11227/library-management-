<?php
namespace App\Middleware;

use App\Config\Database;

class RateLimitMiddleware {
    
    public static function checkLimit(int $maxAttempts = 5, int $decaySeconds = 60) {
        $ip = $_SERVER['REMOTE_ADDR'];
        $db = Database::getConnection();

        $stmt = $db->prepare("SELECT attempts, UNIX_TIMESTAMP(last_attempt) as last_attempt_ts FROM rate_limits WHERE ip_address = :ip");
        $stmt->execute(['ip' => $ip]);
        $record = $stmt->fetch();

        $currentTime = time();

        if ($record) {
            $lastAttemptTime = $record['last_attempt_ts'];
            $attempts = $record['attempts'];

            if ($currentTime - $lastAttemptTime > $decaySeconds) {
                // Reset limit
                $stmt = $db->prepare("UPDATE rate_limits SET attempts = 1, last_attempt = CURRENT_TIMESTAMP WHERE ip_address = :ip");
                $stmt->execute(['ip' => $ip]);
            } else {
                if ($attempts >= $maxAttempts) {
                    http_response_code(429);
                    echo json_encode(['status' => 'error', 'message' => 'Too many requests. Please try again later.']);
                    exit;
                }
                // Increment attempts
                $stmt = $db->prepare("UPDATE rate_limits SET attempts = attempts + 1, last_attempt = CURRENT_TIMESTAMP WHERE ip_address = :ip");
                $stmt->execute(['ip' => $ip]);
            }
        } else {
            // New IP
            $stmt = $db->prepare("INSERT INTO rate_limits (ip_address, attempts) VALUES (:ip, 1)");
            $stmt->execute(['ip' => $ip]);
        }
    }
}

<?php
namespace App\Config;

use PDO;
use PDOException;

class Database {
    private static ?PDO $pdo = null;

    public static function getConnection(): PDO {
        if (self::$pdo === null) {
            $host = getenv('DB_HOST') ?: 'localhost';
            $db_name = getenv('DB_NAME') ?: 'library_management';
            $username = getenv('DB_USER') ?: 'root';
            $password = getenv('DB_PASS') ?: '';
            $charset = getenv('DB_CHARSET') ?: 'utf8mb4';

            $dsn = "mysql:host={$host};dbname={$db_name};charset={$charset}";
            
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];

            try {
                self::$pdo = new PDO($dsn, $username, $password, $options);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Database connection failed'
                ]);
                exit;
            }
        }
        return self::$pdo;
    }
}

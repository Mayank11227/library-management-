<?php
namespace App\Controllers;

use App\Config\Database;
use PDOException;

class HealthController extends BaseController {
    public function database() {
        try {
            $db = Database::getConnection();
            $version = $db->query('select version()')->fetchColumn();
            
            $this->jsonResponse([
                'status' => 'success',
                'database' => 'Connected',
                'mysql_version' => $version,
                'database_name' => getenv('DB_NAME') ?: 'library_management'
            ]);
        } catch (PDOException $e) {
            $this->jsonResponse([
                'status' => 'error',
                'database' => 'Disconnected',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

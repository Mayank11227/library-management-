<?php
namespace App\Models;

use App\Config\Database;
use PDO;

class AdminModel {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function findByEmail(string $email) {
        $stmt = $this->db->prepare("SELECT * FROM admins WHERE email = :email LIMIT 1");
        $stmt->execute(['email' => $email]);
        return $stmt->fetch();
    }
}

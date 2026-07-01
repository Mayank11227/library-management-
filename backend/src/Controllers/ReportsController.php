<?php
namespace App\Controllers;

use App\Config\Database;
use App\Middleware\AuthMiddleware;

class ReportsController extends BaseController {

    public function revenue() {
        AuthMiddleware::authenticate('admin');
        $db = Database::getConnection();
        $stmt = $db->query("
            SELECT DATE(transaction_date) as date, SUM(amount) as total_revenue
            FROM payment_transactions
            WHERE status = 'Completed' AND type = 'Income'
            GROUP BY DATE(transaction_date)
            ORDER BY date DESC
            LIMIT 30
        ");
        $this->jsonResponse(['status' => 'success', 'data' => $stmt->fetchAll()]);
    }

    public function attendance() {
        AuthMiddleware::authenticate('admin');
        $db = Database::getConnection();
        $stmt = $db->query("
            SELECT DATE(date) as date, COUNT(*) as present_count
            FROM attendance
            WHERE status = 'Present'
            GROUP BY DATE(date)
            ORDER BY date DESC
            LIMIT 30
        ");
        $this->jsonResponse(['status' => 'success', 'data' => $stmt->fetchAll()]);
    }
}

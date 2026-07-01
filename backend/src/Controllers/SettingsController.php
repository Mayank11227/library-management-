<?php
namespace App\Controllers;

use App\Config\Database;
use App\Middleware\AuthMiddleware;
use App\Services\ValidationService;

class SettingsController extends BaseController {

    public function index() {
        AuthMiddleware::authenticate('admin');
        $db = Database::getConnection();
        $stmt = $db->query("SELECT * FROM settings");
        
        $settings = [];
        foreach ($stmt->fetchAll() as $row) {
            $settings[$row['setting_key']] = $row['setting_value'];
        }
        
        $this->jsonResponse(['status' => 'success', 'data' => $settings]);
    }

    public function update() {
        AuthMiddleware::authenticate('admin');
        $body = $this->getJsonBody();

        $errors = ValidationService::validate($body, [
            'settings' => 'required'
        ]);

        if ($errors) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors], 400);
        }

        $db = Database::getConnection();
        $db->beginTransaction();
        try {
            $stmt = $db->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (:key, :value) ON DUPLICATE KEY UPDATE setting_value = :value");
            foreach ($body['settings'] as $key => $value) {
                $stmt->execute(['key' => $key, 'value' => $value]);
            }
            $db->commit();
            $this->jsonResponse(['status' => 'success', 'message' => 'Settings updated']);
        } catch (\Exception $e) {
            $db->rollBack();
            throw $e;
        }
    }
}

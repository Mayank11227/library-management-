<?php
namespace App\Controllers;

class BaseController {
    protected function jsonResponse(array $data, int $statusCode = 200) {
        $isSuccess = $statusCode >= 200 && $statusCode < 300;
        
        $standardized = array_merge([
            'success' => $isSuccess,
            'message' => $data['message'] ?? '',
        ], $data);

        if (!$isSuccess && !isset($standardized['errors'])) {
            $standardized['errors'] = [];
        }

        http_response_code($statusCode);
        echo json_encode($standardized);
        exit;
    }

    protected function getJsonBody(): array {
        if (!empty($_POST)) {
            return $_POST;
        }
        $input = file_get_contents('php://input');
        $decoded = json_decode($input, true);
        return is_array($decoded) ? $decoded : [];
    }
}

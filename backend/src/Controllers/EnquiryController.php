<?php
namespace App\Controllers;

use App\Models\EnquiryModel;
use App\Middleware\AuthMiddleware;

class EnquiryController extends BaseController {
    
    private EnquiryModel $enquiryModel;

    public function __construct() {
        $this->enquiryModel = new EnquiryModel();
    }

    public function index() {
        AuthMiddleware::authenticate('admin');
        $enquiries = $this->enquiryModel->getAll();
        $this->jsonResponse(['status' => 'success', 'data' => $enquiries]);
    }

    public function store() {
        // Enquiries might be public (from a landing page)
        $body = $this->getJsonBody();

        if (empty($body['name']) || empty($body['phone'])) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Missing required fields'], 400);
        }

        try {
            $id = $this->enquiryModel->create($body);
            $this->jsonResponse(['status' => 'success', 'message' => 'Enquiry submitted successfully', 'id' => $id], 201);
        } catch (\PDOException $e) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Database error'], 500);
        }
    }

    public function updateStatus($id) {
        AuthMiddleware::authenticate('admin');
        $body = $this->getJsonBody();
        $status = $body['status'] ?? '';

        $validStatuses = ['New', 'Contacted', 'Converted', 'Rejected'];
        if (!in_array($status, $validStatuses)) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Invalid status'], 400);
        }

        $updated = $this->enquiryModel->updateStatus((int)$id, $status);
        if ($updated) {
            $this->jsonResponse(['status' => 'success', 'message' => 'Enquiry status updated']);
        }
        $this->jsonResponse(['status' => 'error', 'message' => 'Failed to update enquiry status'], 400);
    }
}

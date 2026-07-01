<?php
namespace App\Controllers;

use App\Models\MembershipModel;
use App\Middleware\AuthMiddleware;

class MembershipController extends BaseController {
    
    private MembershipModel $membershipModel;

    public function __construct() {
        $this->membershipModel = new MembershipModel();
    }

    public function index() {
        AuthMiddleware::authenticate('admin'); // Typically only admin lists all
        $memberships = $this->membershipModel->getAll();
        $this->jsonResponse(['status' => 'success', 'data' => $memberships]);
    }

    public function plans() {
        AuthMiddleware::authenticate(); // Anyone authenticated can view plans
        $plans = $this->membershipModel->getPlans();
        $this->jsonResponse(['status' => 'success', 'data' => $plans]);
    }

    public function store() {
        AuthMiddleware::authenticate('admin');
        $body = $this->getJsonBody();

        if (empty($body['student_id']) || empty($body['plan_id']) || empty($body['start_date']) || empty($body['end_date'])) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Missing required fields'], 400);
        }

        try {
            $id = $this->membershipModel->create($body);
            $this->jsonResponse(['status' => 'success', 'message' => 'Membership assigned', 'id' => $id], 201);
        } catch (\PDOException $e) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Database error'], 500);
        }
    }

    public function renew($id) {
        AuthMiddleware::authenticate('admin');
        $body = $this->getJsonBody();

        if (empty($body['end_date'])) {
            $this->jsonResponse(['status' => 'error', 'message' => 'New end_date is required'], 400);
        }

        $renewed = $this->membershipModel->renew((int)$id, $body['end_date']);
        if ($renewed) {
            $this->jsonResponse(['status' => 'success', 'message' => 'Membership renewed successfully']);
        }
        $this->jsonResponse(['status' => 'error', 'message' => 'Failed to renew membership'], 400);
    }
}

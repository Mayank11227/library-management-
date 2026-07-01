<?php
namespace App\Controllers;

use App\Models\PaymentModel;
use App\Middleware\AuthMiddleware;
use App\Services\ValidationService;
use Razorpay\Api\Api;
use Razorpay\Api\Errors\SignatureVerificationError;

class PaymentController extends BaseController {
    
    private PaymentModel $paymentModel;

    public function __construct() {
        $this->paymentModel = new PaymentModel();
    }

    public function index() {
        AuthMiddleware::authenticate('admin'); 
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = 50;
        $offset = ($page - 1) * $limit;

        $payments = $this->paymentModel->getAll($limit, $offset);
        $this->jsonResponse(['status' => 'success', 'data' => $payments]);
    }

    public function store() {
        AuthMiddleware::authenticate('admin');
        $body = $this->getJsonBody();

        $errors = ValidationService::validate($body, [
            'category' => 'required',
            'amount' => 'required|numeric'
        ]);

        if ($errors) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors], 400);
        }

        try {
            $txnId = $this->paymentModel->create($body);
            $this->jsonResponse(['status' => 'success', 'message' => 'Transaction recorded', 'txn_id' => $txnId], 201);
        } catch (\PDOException $e) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Database error'], 500);
        }
    }

    public function webhook() {
        $body = $this->getJsonBody();
        $signature = $_SERVER['HTTP_X_RAZORPAY_SIGNATURE'] ?? '';

        if (class_exists(Api::class) && isset($_ENV['RAZORPAY_KEY_ID'])) {
            $api = new Api($_ENV['RAZORPAY_KEY_ID'], $_ENV['RAZORPAY_KEY_SECRET']);
            $webhookSecret = $_ENV['RAZORPAY_WEBHOOK_SECRET'] ?? 'default_secret';
            $payload = file_get_contents('php://input');

            try {
                $api->utility->verifyWebhookSignature($payload, $signature, $webhookSecret);
            } catch (SignatureVerificationError $e) {
                $this->jsonResponse(['status' => 'error', 'message' => 'Invalid signature'], 400);
            }
        }

        if (isset($body['event']) && $body['event'] === 'payment.captured') {
            $txnId = $body['payload']['payment']['entity']['notes']['txn_id'] ?? null;
            if ($txnId) {
                $this->paymentModel->updateStatus($txnId, 'Completed');
            }
        }

        $this->jsonResponse(['status' => 'success']);
    }
}

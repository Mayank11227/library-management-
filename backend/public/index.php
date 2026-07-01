<?php
// Global Exception Handler
set_exception_handler(function (\Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Internal Server Error',
        'debug' => $e->getMessage() // In production, this should be logged instead of shown
    ]);
    exit;
});

// Load Composer Autoloader if exists
if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    require __DIR__ . '/../vendor/autoload.php';
}

// Simple Autoloader for local classes
spl_autoload_register(function ($class) {
    $prefix = 'App\\';
    $base_dir = __DIR__ . '/../src/';
    $len = strlen($prefix);
    
    if (strncmp($prefix, $class, $len) !== 0) {
        if (strpos($class, 'App\\Config\\') === 0) {
             $base_dir = __DIR__ . '/../config/';
             $prefix = 'App\\Config\\';
             $len = strlen($prefix);
        } else {
             return;
        }
    }
    
    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';
    if (file_exists($file)) {
        require $file;
    }
});

use App\Core\Env;
use App\Core\Router;

// Load Env
Env::load(__DIR__ . '/../.env');

// CORS Setup
$allowedOrigins = explode(',', $_ENV['ALLOWED_ORIGINS'] ?? '*');
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins) || $allowedOrigins[0] === '*') {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: *"); // Fallback if no match, though strict CORS would exit here
}

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header("Content-Type: application/json; charset=UTF-8");
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");
header("X-XSS-Protection: 1; mode=block");
header("Strict-Transport-Security: max-age=31536000; includeSubDomains");

// Initialize Router
$router = new Router();

// Routes
// We will prefix everything with /api/v1
$router->get('/api/v1/ping', function() {
    echo json_encode(["status" => "success", "message" => "pong"]);
});

// Health Route
$router->get('/api/v1/health/database', ['App\Controllers\HealthController', 'database']);

// Auth Routes
$router->post('/api/v1/auth/login', ['App\Controllers\AuthController', 'login']);
$router->post('/api/v1/auth/logout', ['App\Controllers\AuthController', 'logout']);

// Students Routes
$router->get('/api/v1/students', ['App\Controllers\StudentController', 'index']);
$router->get('/api/v1/students/{id}', ['App\Controllers\StudentController', 'show']);
$router->post('/api/v1/students', ['App\Controllers\StudentController', 'store']);
$router->put('/api/v1/students/{id}', ['App\Controllers\StudentController', 'update']);
$router->delete('/api/v1/students/{id}', ['App\Controllers\StudentController', 'destroy']);

// Seats Routes
$router->get('/api/v1/seats', ['App\Controllers\SeatController', 'index']);
$router->put('/api/v1/seats/{id}/allocate', ['App\Controllers\SeatController', 'allocate']);
$router->put('/api/v1/seats/{id}/release', ['App\Controllers\SeatController', 'release']);
$router->put('/api/v1/seats/{id}/status', ['App\Controllers\SeatController', 'updateStatus']);

// Memberships Routes
$router->get('/api/v1/memberships', ['App\Controllers\MembershipController', 'index']);
$router->post('/api/v1/memberships', ['App\Controllers\MembershipController', 'store']);
$router->put('/api/v1/memberships/{id}/renew', ['App\Controllers\MembershipController', 'renew']);
$router->get('/api/v1/membership-plans', ['App\Controllers\MembershipController', 'plans']);

// Attendance Routes
$router->get('/api/v1/attendance/today', ['App\Controllers\AttendanceController', 'today']);
$router->post('/api/v1/attendance/scan', ['App\Controllers\AttendanceController', 'scan']);
$router->get('/api/v1/student/attendance', ['App\Controllers\AttendanceController', 'studentAttendance']);

// Study Sessions Routes
$router->get('/api/v1/study-sessions/stats', ['App\Controllers\StudySessionController', 'stats']);

// Payments Routes
$router->get('/api/v1/payments', ['App\Controllers\PaymentController', 'index']);
$router->post('/api/v1/payments', ['App\Controllers\PaymentController', 'store']);
$router->post('/api/v1/payments/razorpay/webhook', ['App\Controllers\PaymentController', 'webhook']);

// Dashboard Routes
$router->get('/api/v1/dashboard/admin', ['App\Controllers\DashboardController', 'admin']);
$router->get('/api/v1/dashboard/student', ['App\Controllers\DashboardController', 'student']);

// Enquiries Routes
$router->get('/api/v1/enquiries', ['App\Controllers\EnquiryController', 'index']);
$router->post('/api/v1/enquiries', ['App\Controllers\EnquiryController', 'store']);
$router->put('/api/v1/enquiries/{id}/status', ['App\Controllers\EnquiryController', 'updateStatus']);

// Reports Routes
$router->get('/api/v1/reports/revenue', ['App\Controllers\ReportsController', 'revenue']);
$router->get('/api/v1/reports/attendance', ['App\Controllers\ReportsController', 'attendance']);

// Notifications Routes
$router->get('/api/v1/notifications', ['App\Controllers\NotificationController', 'index']);
$router->post('/api/v1/notifications', ['App\Controllers\NotificationController', 'store']);
$router->put('/api/v1/notifications/{id}/read', ['App\Controllers\NotificationController', 'read']);

// Settings Routes
$router->get('/api/v1/settings', ['App\Controllers\SettingsController', 'index']);
$router->put('/api/v1/settings', ['App\Controllers\SettingsController', 'update']);

// Gallery Routes
$router->get('/api/v1/gallery', ['App\Controllers\GalleryController', 'index']);
$router->post('/api/v1/gallery', ['App\Controllers\GalleryController', 'store']);
$router->delete('/api/v1/gallery/{id}', ['App\Controllers\GalleryController', 'destroy']);

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];
$router->dispatch($method, $uri);

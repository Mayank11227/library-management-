<?php
namespace App\Controllers;

use App\Models\StudySessionModel;
use App\Middleware\AuthMiddleware;

class StudySessionController extends BaseController {
    
    private StudySessionModel $studySessionModel;

    public function __construct() {
        $this->studySessionModel = new StudySessionModel();
    }

    public function stats() {
        $user = AuthMiddleware::authenticate('student');
        
        $stats = $this->studySessionModel->getStudentStats($user->id);
        
        $this->jsonResponse(['status' => 'success', 'data' => $stats]);
    }
}

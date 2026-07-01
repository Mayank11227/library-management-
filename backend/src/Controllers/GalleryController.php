<?php
namespace App\Controllers;

use App\Models\GalleryModel;
use App\Middleware\AuthMiddleware;
use App\Services\ValidationService;

class GalleryController extends BaseController {
    
    private GalleryModel $galleryModel;

    public function __construct() {
        $this->galleryModel = new GalleryModel();
    }

    public function index() {
        // Public/Student access to view gallery
        $images = $this->galleryModel->getAll();
        $this->jsonResponse(['status' => 'success', 'data' => $images]);
    }

    public function store() {
        AuthMiddleware::authenticate('admin');
        $body = $this->getJsonBody(); // Gets POST data or JSON body
        
        // For file uploads, data usually comes in $_POST, so we merge it
        $data = array_merge($body, $_POST);

        $errors = ValidationService::validate($data, [
            'title' => 'required'
        ]);

        if ($errors) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors], 400);
        }

        if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Image file is required.'], 400);
        }

        // Strict validation for the image
        $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        $maxSize = 5 * 1024 * 1024; // 5MB limit for gallery images

        if (!in_array($_FILES['image']['type'], $allowedTypes)) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Invalid file type. Only JPG, PNG, and WebP are allowed.'], 400);
        }
        
        if ($_FILES['image']['size'] > $maxSize) {
            $this->jsonResponse(['status' => 'error', 'message' => 'File size exceeds 5MB limit.'], 400);
        }

        $uploadPath = __DIR__ . '/../../public/uploads/gallery/';
        if (!is_dir($uploadPath)) mkdir($uploadPath, 0777, true);
        
        $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $filename = time() . '_' . bin2hex(random_bytes(8)) . '.' . $ext;
        
        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadPath . $filename)) {
            $data['image_url'] = '/uploads/gallery/' . $filename;
            
            $id = $this->galleryModel->create($data);
            $this->jsonResponse(['status' => 'success', 'message' => 'Image uploaded successfully', 'id' => $id], 201);
        }

        $this->jsonResponse(['status' => 'error', 'message' => 'Failed to move uploaded file.'], 500);
    }

    public function destroy($id) {
        AuthMiddleware::authenticate('admin');
        
        $image = $this->galleryModel->findById((int)$id);
        if (!$image) {
            $this->jsonResponse(['status' => 'error', 'message' => 'Image not found'], 404);
        }

        // Delete from filesystem
        $filePath = __DIR__ . '/../../public' . $image['image_url'];
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        $deleted = $this->galleryModel->delete((int)$id);
        if ($deleted) {
            $this->jsonResponse(['status' => 'success', 'message' => 'Image deleted successfully']);
        }
        $this->jsonResponse(['status' => 'error', 'message' => 'Failed to delete image from database'], 400);
    }
}

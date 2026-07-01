<?php
namespace App\Models;

use App\Config\Database;
use PDO;

class StudentModel {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function findByEmail(string $email) {
        $stmt = $this->db->prepare("SELECT * FROM students WHERE email = :email LIMIT 1");
        $stmt->execute(['email' => $email]);
        return $stmt->fetch();
    }

    public function findById(int $id) {
        $stmt = $this->db->prepare("SELECT * FROM students WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function getAll(int $limit = 50, int $offset = 0, string $search = '', string $status = '') {
        $query = "SELECT s.id, s.student_id_card, s.name, s.email, s.phone, s.status, s.shift, s.joined_date, s.created_at, s.updated_at, s.profile_image, 
                  sm.id as seat,
                  mp.name as plan,
                  ROUND(IFNULL(att.present_count / (DATEDIFF(CURDATE(), s.joined_date) + 1) * 100, 0)) as attendance
                  FROM students s 
                  LEFT JOIN seat_master sm ON sm.current_student_id = s.id
                  LEFT JOIN (
                      SELECT student_id, MAX(id) as latest_m_id 
                      FROM memberships 
                      WHERE status = 'Active' 
                      GROUP BY student_id
                  ) latest_m ON latest_m.student_id = s.id
                  LEFT JOIN memberships m_act ON m_act.id = latest_m.latest_m_id
                  LEFT JOIN membership_plans mp ON mp.id = m_act.plan_id
                  LEFT JOIN (
                      SELECT student_id, COUNT(id) as present_count 
                      FROM attendance 
                      WHERE status = 'Present' 
                      GROUP BY student_id
                  ) att ON att.student_id = s.id
                  WHERE 1=1";
        $params = [];

        if (!empty($search)) {
            $query .= " AND (s.name LIKE :search OR s.email LIKE :search OR s.student_id_card LIKE :search)";
            $params['search'] = "%$search%";
        }
        if (!empty($status)) {
            $query .= " AND s.status = :status";
            $params['status'] = $status;
        }

        $query .= " ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
        
        $stmt = $this->db->prepare($query);
        
        foreach ($params as $key => $val) {
            $stmt->bindValue($key, $val);
        }
        $stmt->bindValue('limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue('offset', $offset, PDO::PARAM_INT);
        
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function create(array $data) {
        $sql = "INSERT INTO students (student_id_card, name, email, phone, password, status, shift, joined_date) 
                VALUES (:student_id_card, :name, :email, :phone, :password, :status, :shift, :joined_date)";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'student_id_card' => $data['student_id_card'],
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => password_hash($data['password'], PASSWORD_BCRYPT),
            'status' => $data['status'] ?? 'Active',
            'shift' => $data['shift'] ?? null,
            'joined_date' => $data['joined_date'] ?? date('Y-m-d')
        ]);
        return $this->db->lastInsertId();
    }

    public function update(int $id, array $data) {
        $fields = [];
        $params = ['id' => $id];
        foreach ($data as $key => $val) {
            if (in_array($key, ['name', 'phone', 'status', 'shift', 'profile_image'])) {
                $fields[] = "$key = :$key";
                $params[$key] = $val;
            }
        }
        if (empty($fields)) return false;

        $sql = "UPDATE students SET " . implode(", ", $fields) . " WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute($params);
    }

    public function delete(int $id) {
        // Soft delete or just update status to 'Suspended'
        $stmt = $this->db->prepare("UPDATE students SET status = 'Suspended' WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}

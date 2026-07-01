CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id_card VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    status ENUM('Active', 'Suspended', 'Expired') DEFAULT 'Active',
    profile_image VARCHAR(255) NULL,
    shift VARCHAR(50) NULL,
    joined_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS membership_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    duration_months INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status BOOLEAN NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS memberships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    plan_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('Active', 'Expiring Soon', 'Expired') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES membership_plans(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS seat_master (
    id VARCHAR(10) PRIMARY KEY,
    floor VARCHAR(50) NOT NULL,
    section VARCHAR(50) NOT NULL,
    type ENUM('premium', 'standard') DEFAULT 'standard',
    status ENUM('available', 'occupied', 'reserved', 'maintenance', 'blocked') DEFAULT 'available',
    current_student_id INT NULL,
    FOREIGN KEY (current_student_id) REFERENCES students(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    date DATE NOT NULL,
    check_in TIME NOT NULL,
    check_out TIME NULL,
    status ENUM('Present', 'Absent') DEFAULT 'Present',
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS study_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    session_date DATE NOT NULL,
    duration_minutes INT DEFAULT 0,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS payment_transactions (
    id VARCHAR(50) PRIMARY KEY,
    student_id INT NULL,
    type ENUM('Income', 'Expense') DEFAULT 'Income',
    category VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('Cash', 'UPI', 'Razorpay') DEFAULT 'Cash',
    status ENUM('Pending', 'Completed', 'Failed') DEFAULT 'Pending',
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    course_target VARCHAR(100) NULL,
    status ENUM('New', 'Contacted', 'Converted', 'Rejected') DEFAULT 'New',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_type ENUM('admin', 'student') DEFAULT 'student',
    user_id INT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info',
    is_read BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
    setting_key VARCHAR(100) PRIMARY KEY,
    setting_value TEXT NULL
);

CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a default admin for testing
INSERT IGNORE INTO admins (name, email, password) VALUES ('Admin', 'admin@lms.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'); -- password: password

-- PRODUCTION READINESS ADDITIONS --
CREATE TABLE IF NOT EXISTS token_blacklist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(512) NOT NULL UNIQUE,
    blacklisted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rate_limits (
    ip_address VARCHAR(45) PRIMARY KEY,
    attempts INT DEFAULT 1,
    last_attempt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add missing foreign keys
ALTER TABLE notifications ADD CONSTRAINT fk_notif_student FOREIGN KEY (user_id) REFERENCES students(id) ON DELETE CASCADE;

-- Add performance indexes
CREATE INDEX idx_student_status ON students(status);
CREATE INDEX idx_seat_status ON seat_master(status);
CREATE INDEX idx_membership_status ON memberships(status);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_payment_date ON payment_transactions(transaction_date);
CREATE INDEX idx_payment_status ON payment_transactions(status, type);

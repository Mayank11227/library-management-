<?php
require_once __DIR__ . '/../vendor/autoload.php';

// Fallback for custom autoloader if vendor doesn't exist
if (!class_exists('App\Config\Database')) {
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
        if (file_exists($file)) require $file;
    });
}

// Load env
\App\Core\Env::load(__DIR__ . '/../.env');

$db = \App\Config\Database::getConnection();

echo "Seeding Database...\n";

// Ensure settings exist
$db->query("INSERT IGNORE INTO settings (setting_key, setting_value) VALUES 
    ('library_name', 'Study Zone Library'),
    ('contact_email', 'support@studyzone.com'),
    ('contact_phone', '+91 9876543210')
");

// Insert Membership Plans
echo "Inserting Membership Plans...\n";
$db->query("INSERT IGNORE INTO membership_plans (id, name, duration_months, price, status) VALUES 
    (1, 'Monthly Basics', 1, 450.00, 1),
    (2, '6-Month Popular', 6, 2499.00, 1),
    (3, 'Annual Premium', 12, 4999.00, 1)
");

// Insert Students
echo "Inserting Students...\n";
$passwordHash = password_hash('password', PASSWORD_DEFAULT);
$db->query("INSERT IGNORE INTO students (id, student_id_card, name, email, phone, password, status, shift, joined_date) VALUES 
    (1, 'STU-1001', 'John Doe', 'john@example.com', '9876543210', '$passwordHash', 'Active', 'Morning', '2024-01-15'),
    (2, 'STU-1002', 'Jane Smith', 'jane@example.com', '9876543211', '$passwordHash', 'Active', 'Evening', '2024-02-20'),
    (3, 'STU-1003', 'Mike Ross', 'mike@example.com', '9876543212', '$passwordHash', 'Active', 'Full Day', '2024-03-10'),
    (4, 'STU-1004', 'Rachel Zane', 'rachel@example.com', '9876543213', '$passwordHash', 'Suspended', 'Morning', '2024-04-05'),
    (5, 'STU-1005', 'Harvey Specter', 'harvey@example.com', '9876543214', '$passwordHash', 'Expired', 'Full Day', '2023-01-10')
");

// Insert Memberships
echo "Inserting Memberships...\n";
$db->query("INSERT IGNORE INTO memberships (id, student_id, plan_id, start_date, end_date, status) VALUES 
    (1, 1, 2, '2024-01-15', '2024-07-15', 'Active'),
    (2, 2, 1, '2024-05-01', '2024-06-01', 'Expiring Soon'),
    (3, 3, 3, '2024-03-10', '2025-03-10', 'Active'),
    (4, 5, 3, '2023-01-10', '2024-01-10', 'Expired')
");

// Insert Seat Master
echo "Inserting Seats...\n";
for ($i = 1; $i <= 20; $i++) {
    $id = 'A-' . $i;
    $db->query("INSERT IGNORE INTO seat_master (id, floor, section, type, status) VALUES ('$id', '1st Floor', 'A', 'standard', 'available')");
    $idB = 'B-' . $i;
    $db->query("INSERT IGNORE INTO seat_master (id, floor, section, type, status) VALUES ('$idB', '2nd Floor', 'B', 'premium', 'available')");
}

// Allocate some seats
$db->query("UPDATE seat_master SET status = 'occupied', current_student_id = 1 WHERE id = 'A-1'");
$db->query("UPDATE seat_master SET status = 'occupied', current_student_id = 2 WHERE id = 'B-5'");
$db->query("UPDATE seat_master SET status = 'maintenance' WHERE id = 'A-10'");

// Insert Study Sessions for Student 1 (to populate the charts)
echo "Inserting Study Sessions...\n";
$today = date('Y-m-d');
$yesterday = date('Y-m-d', strtotime('-1 day'));
$twoDaysAgo = date('Y-m-d', strtotime('-2 days'));

$db->query("INSERT IGNORE INTO study_sessions (student_id, session_date, duration_minutes) VALUES 
    (1, '$today', 120),
    (1, '$yesterday', 180),
    (1, '$twoDaysAgo', 240),
    (2, '$today', 60),
    (3, '$yesterday', 300)
");

// Insert Notifications
echo "Inserting Notifications...\n";
$db->query("INSERT IGNORE INTO notifications (user_type, user_id, title, message, type, is_read) VALUES 
    ('student', NULL, 'Library Closed Tomorrow', 'The library will be closed due to a public holiday.', 'alert', 0),
    ('student', 1, 'Welcome to Study Zone', 'We are glad to have you here.', 'info', 0),
    ('student', 2, 'Membership Expiring', 'Your membership expires in 3 days.', 'membership', 0)
");

echo "Seeding Complete!\n";

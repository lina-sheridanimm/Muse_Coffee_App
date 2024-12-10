<?php
require_once '../config/db.php';
header('Content-Type: application/json');

session_start();

// Get cafe_id from GET request
$cafe_id = isset($_GET['cafe_id']) ? (int)$_GET['cafe_id'] : 0;
$user_id = isset($_SESSION['user_id']);

if ($cafe_id <= 0) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid cafe ID'
    ]);
    exit;
}

try {
    // Fetch all reviews for the specified cafe_id
    $stmt = $pdo->prepare("
        SELECT r.*, u.user_name, u.portrait_image 
        FROM cafe_reviews r
        JOIN brewmatch_users u ON r.user_id = u.user_id
        WHERE r.cafe_id = ?
        ORDER BY r.review_date DESC
    ");
    
    $stmt->execute([$cafe_id]);
    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Log for debugging
    error_log('Reviews API called for cafe_id: ' . $cafe_id);
    error_log('Found reviews: ' . json_encode($reviews));
    
    // Send the reviews as JSON response
    echo json_encode([
        'status' => 'success',
        'reviews' => $reviews
    ]);
} catch (PDOException $e) {
    error_log('Database error: ' . $e->getMessage());
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error'
    ]);
}

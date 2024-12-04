<?php
require_once '../config/db.php';
header('Content-Type: application/json');

$cafe_id = isset($_GET['cafe_id']) ? (int)$_GET['cafe_id'] : 1;

try {
    // Different SQL query based on cafe_id
    if ($cafe_id == 1) {
        // First cafe shows reviews from users 1 and 2
        $stmt = $pdo->prepare("
            SELECT r.*, u.user_name, u.portrait_image 
            FROM cafe_reviews r
            JOIN brewmatch_users u ON r.user_id = u.user_id
            WHERE r.cafe_id = ? AND r.user_id IN (1, 2)
            ORDER BY r.review_date DESC
        ");
    } elseif ($cafe_id == 2) {
        // Second cafe shows review from user 3
        $stmt = $pdo->prepare("
            SELECT r.*, u.user_name, u.portrait_image 
            FROM cafe_reviews r
            JOIN brewmatch_users u ON r.user_id = u.user_id
            WHERE r.cafe_id = ? AND r.user_id = 3
            ORDER BY r.review_date DESC
        ");
    } else {
        // Third cafe shows review from user 4
        $stmt = $pdo->prepare("
            SELECT r.*, u.user_name, u.portrait_image 
            FROM cafe_reviews r
            JOIN brewmatch_users u ON r.user_id = u.user_id
            WHERE r.cafe_id = ? AND r.user_id = 4
            ORDER BY r.review_date DESC
        ");
    }
    
    $stmt->execute([$cafe_id]);
    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    error_log('Reviews API called for cafe_id: ' . $cafe_id);
    error_log('Found reviews: ' . json_encode($reviews));
    
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

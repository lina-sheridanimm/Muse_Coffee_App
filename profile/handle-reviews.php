<?php
require_once '../config/db.php';
header('Content-Type: application/json');

session_start();

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'User not logged in'
    ]);
    exit;
}

// Read and log raw POST data
$rawData = file_get_contents('php://input');
error_log("Raw POST data: $rawData");

// Decode the JSON
$data = json_decode($rawData, true);

// Log the decoded JSON data
error_log("Decoded POST data: " . print_r($data, true));

// Retrieve POST data
$user_id = $_SESSION['user_id'];
$cafe_id = isset($data['cafe_id']) ? (int)$data['cafe_id'] : 0;
$rating = isset($data['rating']) ? (int)$data['rating'] : 0;
$review_text = isset($data['description']) ? trim($data['description']) : '';

if ($cafe_id <= 0 || $rating < 1 || $rating > 5 || empty($review_text)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid input'
    ]);
    exit;
}

try {
    // Check if the user has already reviewed the cafe
    $checkStmt = $pdo->prepare("SELECT * FROM cafe_reviews WHERE user_id = ? AND cafe_id = ?");
    $checkStmt->execute([$user_id, $cafe_id]);
    $existingReview = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if ($existingReview) {
        echo json_encode([
            'status' => 'error',
            'message' => 'You have already submitted a review for this cafe! Adjust your review in your profile.'
        ]);
        exit;
    }

    // Insert the new review
    $stmt = $pdo->prepare("
        INSERT INTO cafe_reviews (cafe_id, user_id, rating, review_text, review_date) 
        VALUES (?, ?, ?, ?, NOW())
    ");
    $stmt->execute([$cafe_id, $user_id, $rating, $review_text]);

    echo json_encode([
        'status' => 'success',
        'message' => 'Review submitted successfully'
    ]);
} catch (PDOException $e) {
    error_log('Database error: ' . $e->getMessage());
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error'
    ]);
}

<?php
session_start();
require_once '../config/db.php';

// Ensure the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in.']);
    exit();
}

$user_id = $_SESSION['user_id'];

// Handle deletion request
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['action']) && $_POST['action'] == 'delete_account') {
    try {
        // First, delete any dependent data in the user_personality_results table
        $deletePersonalityResults = $pdo->prepare("DELETE FROM user_personality_results WHERE user_id = ?");
        $deletePersonalityResults->execute([$user_id]);

        // Then, delete the user from the brewmatch_users table
        $deleteUser = $pdo->prepare("DELETE FROM brewmatch_users WHERE user_id = ?");
        $deleteUser->execute([$user_id]);

        // Destroy the session to log the user out
        session_destroy();

        // Return success response
        echo json_encode(['status' => 'success']);
        exit();
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error deleting account: ' . $e->getMessage()]);
        exit();
    }
}
?>

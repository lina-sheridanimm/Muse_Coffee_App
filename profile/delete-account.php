<?php
session_start();
require_once '../config/db.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in.']);
    exit();
}

$user_id = $_SESSION['user_id'];

// handle account delete
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['action']) && $_POST['action'] == 'delete_account') {
    try {
        $pdo->beginTransaction();

        $deleteReviews = $pdo->prepare("DELETE FROM cafe_reviews WHERE user_id = ?");
        $deleteReviews->execute([$user_id]);

        $deletePersonalityResults = $pdo->prepare("DELETE FROM user_personality_results WHERE user_id = ?");
        $deletePersonalityResults->execute([$user_id]);

        $deleteUser = $pdo->prepare("DELETE FROM brewmatch_users WHERE user_id = ?");
        $deleteUser->execute([$user_id]);

        $pdo->commit();
        session_destroy();

        echo json_encode(['status' => 'success']);
        exit();
    } catch (PDOException $e) {
        $pdo->rollBack();
        echo json_encode(['status' => 'error', 'message' => 'Error deleting account: ' . $e->getMessage()]);
        exit();
    }
}
?>

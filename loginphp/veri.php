<?php
session_start();

if (!isset($_SESSION['signup_email'])) {
    header('Location: signup.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $host = "localhost";
    $dbname = "brewmatch";
    $username = "root";
    $password = "";

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Always return success for testing
        // Return different destinations based on whether user is new
        $response = array(
            'success' => true,
            'isNewUser' => isset($_SESSION['is_new_user']) && $_SESSION['is_new_user']
        );

        header('Content-Type: application/json');
        echo json_encode($response);
        exit;

    } catch(PDOException $e) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Database error']);
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rubik+Dirt&family=Urbanist&display=swap" rel="stylesheet">
    <title>Verification - BrewMatch</title>
    <link rel="stylesheet" href="main.css">
</head>
<body>
    <div id="app">
        <div class="verification-container">
            <div class="back-button">
                <button id="backBtn" class="back-arrow">
                    <img src="back.png" alt="Back" class="back-icon">
                </button>
            </div>
            <div class="verification-content">
                <h1 class="verification-title">Verification</h1>
                <p class="verification-description">Enter the verification code we just sent on your email address.</p>
                <div class="code-inputs">
                    <input type="text" maxlength="1" class="code-input" data-index="0">
                    <input type="text" maxlength="1" class="code-input" data-index="1">
                    <input type="text" maxlength="1" class="code-input" data-index="2">
                    <input type="text" maxlength="1" class="code-input" data-index="3">
                </div>
                <div id="errorMessage" class="error-message" style="display: none;">
                    Invalid verification code. Please try again.
                </div>
                <button id="verifyBtn" class="verify-button" disabled>Verify</button>
                <div class="resend-section">
                    <span>Didn't receive code? </span>
                    <a href="#" id="resendBtn" class="resend-link">Resend</a>
                </div>
            </div>
        </div>
    </div>
    <script src="veri.js"></script>
</body>
</html>
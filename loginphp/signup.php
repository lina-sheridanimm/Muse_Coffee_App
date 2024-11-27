<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $host = "localhost";
    $dbname = "brewmatch";
    $username = "root";  
    $password = "";      

    $response = array(
        'success' => false,
        'message' => ''
    );

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $username = isset($_POST['username']) ? trim($_POST['username']) : '';
        $email = isset($_POST['email']) ? trim($_POST['email']) : '';

        // Input validation
        if (empty($username) || empty($email)) {
            throw new Exception("Username and email are required");
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception("Invalid email format");
        }

        // Check email existence
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM brewmatch_users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetchColumn() > 0) {
            throw new Exception("Email already exists");
        }

        // Check username existence
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM brewmatch_users WHERE user_name = ?");
        $stmt->execute([$username]);
        if ($stmt->fetchColumn() > 0) {
            throw new Exception("Username already exists");
        }

        // Insert new user
        $stmt = $pdo->prepare("INSERT INTO brewmatch_users (user_name, email, personality) VALUES (?, ?, '')");
        if ($stmt->execute([$username, $email])) {
            $_SESSION['signup_email'] = $email;
            $_SESSION['signup_username'] = $username;
            $_SESSION['user_id'] = $pdo->lastInsertId();
            $_SESSION['is_new_user'] = true;

            $response['success'] = true;
            $response['message'] = "Registration successful";
        } else {
            throw new Exception("Error during registration");
        }

    } catch(PDOException $e) {
        $response['message'] = "Database error: " . $e->getMessage();
    } catch(Exception $e) {
        $response['message'] = $e->getMessage();
    }

    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
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
    <title>Sign Up BrewMatch</title>
    <link rel="stylesheet" href="main.css">
</head>
<body>
    <div id="app">
        <div class="signup-container">
            <div class="back-button">
                <button id="backBtn" class="back-arrow">
                    <img src="back.png" alt="Back" class="back-icon">
                </button>
            </div>
            <div class="signup-content">
                <h1 class="signup-title">Start your new coffee journey!</h1>
                <form id="signupForm" class="signup-form">
                    <div class="input-group">
                        <input type="text" id="username" name="username" placeholder="Username" required>
                    </div>
                    <div class="input-group">
                        <input type="email" id="email" name="email" placeholder="Email" required>
                    </div>
                    <div class="terms-privacy">
                        <a href="#" class="privacy-link">Privacy Policy, Terms of Service</a>
                    </div>
                    <button type="submit" class="submit-button">Agree and Register</button>
                </form>
                <div id="errorMessage" class="error-message" style="display: none;"></div>
            </div>
        </div>
    </div>
    <script src="signup.js"></script>
</body>
</html>
<?php
session_start();
// Clear any existing session data
session_destroy();
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rubik+Dirt&family=Urbanist&display=swap" rel="stylesheet">
    <title>BrewMatch</title>
    <link rel="stylesheet" href="main.css">
</head>
<body>
    <div id="app">
        <div class="landing-container">
            <!-- Logo Section -->
            <div class="logo-section">
                <div class="logo-container">
                    <img src="BMLogo.png" alt="BrewMatch Logo" id="logo">
                </div>
                <h1 class="brand-name">BrewMatch</h1>
                <p class="tagline">"Discover Your Perfect Coffee Moment!"</p>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons">
                <button id="loginBtn" class="primary-button">Log in</button>
                <button id="signupBtn" class="secondary-button">Sign up</button>
            </div>
        </div>
    </div>
    <script src="login.js"></script>
</body>
</html>
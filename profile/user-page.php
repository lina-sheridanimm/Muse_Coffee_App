<?php
session_start();
require_once '../config/db.php';

// if (!isset($_SESSION['user_id'])) {
//     header('Location: login.php');
//     exit();
// }
// Get user ID from session
$user_id = 2; //$_SESSION['user_id'];

// Get user data from database
$stmt = $pdo->prepare("
    SELECT u.*, pt.type_name, pt.type_badge_image 
    FROM brewmatch_users u
    LEFT JOIN user_personality_results upr ON u.user_id = upr.user_id
    LEFT JOIN personality_types pt ON upr.personality_type_id = pt.type_id
    WHERE u.user_id = ?
");

$stmt->execute([$user_id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
//echo json_encode($user);
$className = strtolower(str_replace(' ', '-', $user['type_name']));
//echo htmlspecialchars($className); 

?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BrewMatch - <?php echo htmlspecialchars($user['user_name']); ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet">
    <link rel="stylesheet" href="css/user_profile.css" />
  </head>
  <body>
    <div class="profile-container <?php echo htmlspecialchars($className); ?>" 
         data-user-type="<?php echo htmlspecialchars($className); ?>">
      <!-- Top Navigation -->
      <nav class="top-nav">
        <button class="back-btn">
          <span class="material-icons">arrow_back</span>
        </button>
        <button class="settings-btn">
          <span class="material-icons">settings</span>
        </button>
      </nav>

      <!-- User Profile Section -->
      <div class="user-info">
        <div class="profile-banner">
          <div class="profile-image-container">
            <img
              src="<?php echo htmlspecialchars("assets/users/".$user['portrait_image']); ?>"
              alt="Profile picture"
              class="profile-image"
            />
            <div class="badge">
              <img
                src="<?php echo htmlspecialchars("assets/users/".$user['type_badge_image']); ?>"
                alt="Arabica Adventurer badge"
                class="badge-image"
              />
            </div>
          </div>
        </div>
        <h1 class="username"><?php echo htmlspecialchars($user['user_name']); ?></h1>
        <p class="bio"><?php echo htmlspecialchars($user['bio']); ?></p>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="message-btn <?php echo htmlspecialchars($className); ?>">Message</button>
          <button class="edit-profile-btn <?php echo htmlspecialchars($className); ?>">Edit Profile</button>
        </div>
      </div>

      <!-- Tabs Section -->
      <div class="tabs-section">
        <div class="tabs">
          <button class="tab active">Reviews</button>
          <button class="tab">Saved</button>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
          <div class="review-grid active">
            <?php
            // Get user's reviews
            $reviewStmt = $pdo->prepare("
                SELECT r.*, c.name as cafe_name 
                FROM cafe_reviews r
                JOIN brewmatch_cafes c ON r.cafe_id = c.cafe_id
                WHERE r.user_id = ?
                ORDER BY r.review_date DESC
            ");
            $reviewStmt->execute([$user_id]);
            $reviews = $reviewStmt->fetchAll(PDO::FETCH_ASSOC);

            foreach ($reviews as $review) {
                echo '<div class="review-card" onclick="window.location.href=\'cafe_profile.html?id=' . $review['cafe_id'] . '\'">';
                echo '<div class="review-header">';
                echo '<div class="reviewer-info">';
                echo '<h4>' . htmlspecialchars($review['cafe_name']) . '</h4>';
                echo '<div class="rating-beans">' . str_repeat('☕', $review['rating']) . '</div>';
                echo '</div></div>';
                echo '<p class="review-text">' . htmlspecialchars($review['review_text']) . '</p>';
                echo '</div>';
            }
            ?>
          </div>
          <div class="saved-grid">
            <!-- Saved content will go here -->
          </div>
        </div>
      </div>

      <!-- Bottom Navigation -->
      <nav class="bottom-nav">
        <a href="#" class="nav-item">
          <span class="material-icons">explore</span>
          <span>Explore</span>
        </a>
        <a href="#" class="nav-item">
          <span class="material-icons">coffee</span>
          <span>Recommendations</span>
        </a>
        <a href="#" class="nav-item active">
          <span class="material-icons">person</span>
          <span>You</span>
        </a>
      </nav>
    </div>
    <script src="js/user_profile.js"></script>
  </body>
</html>
</html>
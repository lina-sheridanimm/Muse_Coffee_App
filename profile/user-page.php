<?php
session_start();
require_once '../config/db.php';

if (!isset($_SESSION['user_id'])) {
    header('Location: filter.html');
    exit();
}

$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['bio'])) {
    $bio = trim($_POST['bio']);
    
    try {
        $stmt = $pdo->prepare("UPDATE brewmatch_users SET bio = ? WHERE user_id = ?");
        $stmt->execute([$bio, $user_id]);
        
        $_SESSION['bio'] = $bio;
        
        echo json_encode(['status' => 'success', 'bio' => $bio]);
        exit();
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update bio.']);
        exit();
    }
}

try {
    $stmt = $pdo->prepare("
        SELECT u.*, pt.type_name, pt.type_badge_image 
        FROM brewmatch_users u
        LEFT JOIN user_personality_results upr ON u.user_id = upr.user_id
        LEFT JOIN personality_types pt ON upr.personality_type_id = pt.type_id
        WHERE u.user_id = ?
    ");
    $stmt->execute([$user_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        die("User not found.");
    }

    $className = isset($user['type_name']) 
        ? strtolower(str_replace(' ', '-', $user['type_name'])) 
        : 'default-class';

    $reviewStmt = $pdo->prepare("
        SELECT r.*, c.name as cafe_name 
        FROM cafe_reviews r
        JOIN brewmatch_cafes c ON r.cafe_id = c.cafe_id
        WHERE r.user_id = ?
        ORDER BY r.review_date DESC
    ");
    $reviewStmt->execute([$user_id]);
    $reviews = $reviewStmt->fetchAll(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    die("Database error: " . $e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BrewMatch - <?php echo htmlspecialchars($user['user_name']); ?></title>
    <link rel="stylesheet" href="css/user_profile.css">
</head>
<body>
    <div class="profile-container <?php echo htmlspecialchars($className); ?>" data-user-type="<?php echo htmlspecialchars($className); ?>">
        <!-- Top Navigation -->
        <nav class="top-nav">
            <button class="back-btn" onclick="window.location.href='../filter/filter.html'">
                <span class="material-icons">arrow_back</span>
            </button>
            <button class="settings-btn">
                <span class="material-icons">settings</span>
            </button>
        </nav>

        <!-- Account Deletion Popup -->
        <div id="delete-account-popup" class="popup">
            <div class="popup-content">
                <span class="popup-close" onclick="closeDeletePopup()">&times;</span>
                <h3>Are you sure you want to delete your account?</h3>
                <p>This action cannot be undone.</p>
                <div class="popup-actions">
                    <button class="cancel-btn" onclick="closeDeletePopup()">Cancel</button>
                    <button class="delete-btn" onclick="deleteAccount()">Delete Account</button>
                </div>
            </div>
        </div>

        <!-- User Profile Section -->
        <div class="user-info">
            <div class="profile-banner">
                <div class="profile-image-container">
                    <img src="<?php echo htmlspecialchars("assets/users/".$user['portrait_image']); ?>" alt="Profile picture" class="profile-image">
                    <div class="badge">
                        <img src="<?php echo htmlspecialchars("assets/users/".$user['type_badge_image']); ?>" alt="User badge" class="badge-image">
                    </div>
                </div>
            </div>
            <h1 class="username"><?php echo htmlspecialchars($user['user_name']); ?></h1>
            <p class="bio"><?php echo htmlspecialchars($user['bio']); ?></p>

            <!-- Action Buttons -->
            <div class="action-buttons">
                <button class="edit-profile-btn <?php echo htmlspecialchars($className); ?>">Edit Profile</button>
            </div>
        </div>

        <!-- Popup Modal for Editing Bio -->
        <div id="edit-bio-popup" class="popup">
            <div class="popup-content">
                <span class="popup-close" onclick="closeBioPopup()">&times;</span>
                <h3>Edit Bio</h3>
                <form id="edit-bio-form">
                    <textarea id="new-bio" name="bio" rows="4" placeholder="Enter your new bio..."><?php echo htmlspecialchars($user['bio']); ?></textarea>
                    <button type="submit">Save</button>
                </form>
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
                    <?php foreach ($reviews as $review): ?>
                        <div class="review-card" onclick="window.location.href='cafe_profile.html?id=<?php echo $review['cafe_id']; ?>'">
                            <div class="review-header">
                                <h4><?php echo htmlspecialchars($review['cafe_name']); ?></h4>
                                <div class="rating-beans"><?php echo str_repeat('☕', $review['rating']); ?></div>
                            </div>
                            <p class="review-text"><?php echo htmlspecialchars($review['review_text']); ?></p>
                        </div>
                    <?php endforeach; ?>
                </div>
                <div class="saved-grid">
                    <!-- Saved content will go here -->
                </div>
            </div>
        </div>

        <!-- Bottom Navigation -->
        <nav class="bottom-nav">
            <div class="nav-item" onclick="window.location.href='../filter/filter.html'">
                <span class="material-icons">explore</span>
                <span>Explore</span>
            </div>
            <div class="nav-item">
                <span class="material-icons">coffee</span>
                <span>Recommendations</span>
            </div>
            <div class="nav-item active">
                <span class="material-icons">person</span>
                <span>You</span>
            </div>
        </nav>
    </div>
    <script src="js/user_profile.js"></script>
</body>
</html>

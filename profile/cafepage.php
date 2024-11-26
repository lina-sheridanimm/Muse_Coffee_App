<?php
// Database connection
require_once 'config/db.php';

// Get cafe ID from URL parameter
$cafe_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

// Fetch cafe data
$stmt = $pdo->prepare("
    SELECT c.*, 
           COUNT(DISTINCT r.review_id) as review_count,
           AVG(r.rating) as average_rating
    FROM brewmatch_cafes c
    LEFT JOIN reviews r ON c.cafe_id = r.cafe_id
    WHERE c.cafe_id = ?
    GROUP BY c.cafe_id
");
$stmt->execute([$cafe_id]);
$cafe = $stmt->fetch(PDO::FETCH_ASSOC);

// If cafe doesn't exist, redirect to 404 or home
if (!$cafe) {
    header('Location: /404.php');
    exit();
}

// Process images array
$images = $cafe['images'] ? explode(',', $cafe['images']) : [];
// Process tags array
$tags = $cafe['tags'] ? explode(',', $cafe['tags']) : [];
// Calculate rating display
$rating_beans = str_repeat('☕', round($cafe['average_rating']));
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($cafe['cafe_name']) ?> - BrewMatch</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="cafe_profile.css">
</head>
<body>
    <div class="profile-container">
        <!-- Header Navigation -->
        <header class="page-header">
            <button class="back-btn" aria-label="Back to all results">
                <span class="material-icons">arrow_back</span>
            </button>
        </header>

        <!-- Photo Gallery -->
        <section class="photo-gallery">
            <div class="gallery-container">
                <?php foreach ($images as $image): ?>
                <img src="<?= htmlspecialchars($image) ?>" 
                     alt="<?= htmlspecialchars($cafe['cafe_name']) ?>" 
                     class="gallery-image">
                <?php endforeach; ?>
            </div>
        </section>

        <!-- Cafe Information -->
        <section class="cafe-info">
            <!-- Primary Info: Name and Location -->
            <div class="primary-info">
                <h2 class="cafe-name"><?= htmlspecialchars($cafe['name']) ?></h2>
                <div class="location-info">
                    <span class="material-icons">location_on</span>
                    <span>Oakville · <?= htmlspecialchars($cafe['distance_category']) ?></span>
                </div>
            </div>

            <!-- Secondary Info -->
            <div class="info-actions-row">
                <div class="secondary-info">
                    <div class="rating-info">
                        <div class="rating-beans">
                            <?php 
                            $rating = round($cafe['rating']);
                            for($i = 0; $i < $rating; $i++) {
                                echo '<span class="bean-icon">☕</span>';
                            }
                            ?>
                        </div>
                        <span class="rating-text">
                            <?= number_format($cafe['rating'], 1) ?> 
                            (<?= $cafe['review_count'] ?? 0 ?> reviews)
                        </span>
                    </div>
                    <div class="ambience-info">
                        <span class="ambience-text"><?= htmlspecialchars($cafe['ambience']) ?></span>
                    </div>
                </div>

                <div class="action-buttons">
                    <button class="action-btn" aria-label="More options">
                        <span class="material-icons">more_horiz</span>
                    </button>
                    <button class="action-btn" aria-label="Save to collection">
                        <span class="material-icons">bookmark_border</span>
                    </button>
                </div>
            </div>
        </section>

        <!-- Feature Tags -->
        <section class="feature-tags">
            <h3 class="section-title">Feature Tags</h3>
            <div class="tags-scroll-container">
                <div class="tags-wrapper">
                    <?php foreach ($tags as $tag): ?>
                    <span class="tag"><?= htmlspecialchars($tag) ?></span>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>

        <!-- Menu and Reviews Section -->
        <?php
        // Fetch menu items
        $menu_stmt = $pdo->prepare("
            SELECT * FROM menu_items 
            WHERE cafe_id = ? 
            ORDER BY category
        ");
        $menu_stmt->execute([$cafe_id]);
        $menu_items = $menu_stmt->fetchAll(PDO::FETCH_ASSOC);
        ?>

        <section class="content-tabs">
            <!-- ... Rest of your HTML structure ... -->
            <div class="menu-items">
                <?php foreach ($menu_items as $item): ?>
                <article class="menu-item">
                    <img src="<?= htmlspecialchars($item['image_url']) ?>" 
                         alt="<?= htmlspecialchars($item['item_name']) ?>" 
                         class="item-image">
                    <div class="item-details">
                        <h4 class="item-name"><?= htmlspecialchars($item['item_name']) ?></h4>
                        <p class="item-price">$<?= number_format($item['price'], 2) ?></p>
                    </div>
                    <button class="favorite-btn" aria-label="Add to favorites">
                        <span class="material-icons">star</span>
                    </button>
                </article>
                <?php endforeach; ?>
            </div>
        </section>

        <!-- Bottom Navigation -->
        <nav class="bottom-nav">
            <!-- ... Your navigation items ... -->
        </nav>
    </div>

    <div class="photo-overlay">
        <div class="overlay-background"></div>
        <div class="enlarged-photo-container">
            <img class="enlarged-photo" src="" alt="Enlarged cafe photo">
        </div>
    </div>

    <script src="cafe_profile.js"></script>
</body>
</html> 
<?php
require_once '../config/db.php';
// Simulated API response
header('Content-Type: application/json');

// Get cafe ID from request
$cafe_id = isset($_GET['id']) ? (int)$_GET['id'] : 1;

// Get cafe data from database
$stmt = $pdo->prepare("
    SELECT DISTINCT bc.*,
           bc.rating as average_rating,
           GROUP_CONCAT(DISTINCT cm.meal_type) as meal_types,
           GROUP_CONCAT(DISTINCT cd.drink_type) as drink_types,
           GROUP_CONCAT(DISTINCT cg.good_for) as good_for_types,
           GROUP_CONCAT(DISTINCT ca.amenity) as amenities
    FROM brewmatch_cafes bc
    LEFT JOIN cafe_meals cm ON bc.cafe_id = cm.cafe_id
    LEFT JOIN cafe_drinks cd ON bc.cafe_id = cd.cafe_id
    LEFT JOIN cafe_good_for cg ON bc.cafe_id = cg.cafe_id
    LEFT JOIN cafe_amenities ca ON bc.cafe_id = ca.cafe_id
    WHERE bc.cafe_id = ?
    GROUP BY bc.cafe_id
");

$stmt->execute([$cafe_id]);
$cafe = $stmt->fetch(PDO::FETCH_ASSOC);
// Process feature strings
$features = [];

// Ambience - use directly
if (!empty($cafe['ambience'])) {
    $features['ambience'] = $cafe['ambience'];
}

// Good for types - split by comma
if (!empty($cafe['good_for_types'])) {
    $good_for_array = explode(',', $cafe['good_for_types']);
    $features['good_for'] = implode(' / ', $good_for_array);
}

// Amenities - split by comma into array
if (!empty($cafe['amenities'])) {
    $features['amenities'] = explode(',', $cafe['amenities']);
}

// Meal types - keep first "Good for" item, concat with slash
if (!empty($cafe['meal_types'])) {
    $meal_types = explode(',', $cafe['meal_types']);
    $meal_types = array_map(function($type) {
        return str_replace('Good for ', '', $type);
    }, $meal_types);
    $features['meal_types'] = implode(' / ', $meal_types);
}

// Drink types - split by comma, concat with slash
if (!empty($cafe['drink_types'])) {
    $drink_types = explode(',', $cafe['drink_types']);
    $features['drink_types'] = explode(',', $cafe['drink_types']);
}

// Add this query after your existing cafe query
$photos_stmt = $pdo->prepare("
    SELECT photo_url, photo_description 
    FROM cafe_photos 
    WHERE cafe_id = ?
    ORDER BY photo_order
");

$photos_stmt->execute([$cafe_id]);
$photos = $photos_stmt->fetchAll(PDO::FETCH_ASSOC);

// Get cafe hours from database
$hours_stmt = $pdo->prepare("
    SELECT 
        day_of_week,
        TIME_FORMAT(open_time, '%H:%i') as open_time,
        TIME_FORMAT(close_time, '%H:%i') as close_time
    FROM cafe_hours 
    WHERE cafe_id = ?
    ORDER BY FIELD(day_of_week, 
        'monday', 'tuesday', 'wednesday', 
        'thursday', 'friday', 'saturday', 'sunday')
");

$hours_stmt->execute([$cafe_id]);
$hours_rows = $hours_stmt->fetchAll(PDO::FETCH_ASSOC);

$cafe_hours = [];
foreach ($hours_rows as $row) {
    $cafe_hours[$row['day_of_week']] = [
        'open' => $row['open_time'],
        'close' => $row['close_time']
    ];
}

// Format cafe data
$cafe_data = [
    'id' => $cafe['cafe_id'],
    'name' => $cafe['name'],
    'location' => [
        'city' => "Oakville",
        'distance' => $cafe['distance_category']
    ],
    'rating' => [
        'score' => round($cafe['average_rating'], 1),
        'total_reviews' => 5, // Placeholder value since review_count doesn't exist in DB
        'beans' => floor($cafe['average_rating']) // Convert rating to whole number of beans
    ],
    "open_hours" => $cafe_hours,
    'features' => $features,
    'photos' => array_map(function($photo) {
        return [
            'url' => $photo['photo_url'],
            'description' => $photo['photo_description']
        ];
    }, $photos)
];

//"ambience":"modern & lively"


// Return JSON response
echo json_encode([
    'status' => 'success',
    'data' =>  $cafe_data
]);
?>
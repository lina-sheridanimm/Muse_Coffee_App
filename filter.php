<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "brewmatch"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Initialize variables
$distance = '';
$ambience = '';
$selected_meals = [];
$selected_drinks = [];
$selected_good_for = [];
$selected_amenities = [];

// Base query
$sql = "SELECT DISTINCT bc.* 
        FROM brewmatch_cafes bc
        LEFT JOIN cafe_meals cm ON bc.cafe_id = cm.cafe_id
        LEFT JOIN cafe_drinks cd ON bc.cafe_id = cd.cafe_id
        LEFT JOIN cafe_good_for cg ON bc.cafe_id = cg.cafe_id
        LEFT JOIN cafe_amenities ca ON bc.cafe_id = ca.cafe_id
        WHERE 1";

// Process filters when the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Distance filter
    if (!empty($_POST['distance'])) {
        $distance = $_POST['distance'];
        if ($distance != 'any') {
            $sql .= " AND bc.distance_category = '" . $conn->real_escape_string($distance) . "'";
        }
    }

    // Ambience filter
    if (!empty($_POST['ambience'])) {
        $ambience = $_POST['ambience'];
        $sql .= " AND bc.ambience = '" . $conn->real_escape_string($ambience) . "'";
    }

    // Meals filter
    if (!empty($_POST['meals'])) {
        $selected_meals = $_POST['meals'];
        $meal_list = implode("','", array_map([$conn, 'real_escape_string'], $selected_meals));
        $sql .= " AND cm.meal_type IN ('$meal_list')";
    }

    // Drink types filter
    if (!empty($_POST['drinks'])) {
        $selected_drinks = $_POST['drinks'];
        $drink_list = implode("','", array_map([$conn, 'real_escape_string'], $selected_drinks));
        $sql .= " AND cd.drink_type IN ('$drink_list')";
    }

    // Good for filter
    if (!empty($_POST['good_for'])) {
        $selected_good_for = $_POST['good_for'];
        $good_for_list = implode("','", array_map([$conn, 'real_escape_string'], $selected_good_for));
        $sql .= " AND cg.good_for IN ('$good_for_list')";
    }

    // Amenities filter
    if (!empty($_POST['amenities'])) {
        $selected_amenities = $_POST['amenities'];
        $amenity_list = implode("','", array_map([$conn, 'real_escape_string'], $selected_amenities));
        $sql .= " AND ca.amenity IN ('$amenity_list')";
    }
}

$result = $conn->query($sql);

// Hardcoded options for filters
$meal_options = ["Good for Breakfast", "Good for Brunch", "Good for Lunch", "Good for Dessert"];
$drink_options = ["Pour-Over Coffee", "Non-Coffee Options", "Hand-Drip Options", "Seasonal/Themed Menu"];
$good_for_options = ["Pet", "Kids", "Groups", "Event", "Study", "Work"];
$amenity_options = ["Offers Delivery", "Offers Takeout", "Takes Reservation", "Free Wifi", "Outdoor Seating", "Wheelchair Accessible", "Charging Socket Provided", "24/7"];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Filter Cafes</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        form { margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f4f4f4; }
        .filter-group { margin-bottom: 15px; }
        .filter-group label { display: block; margin-bottom: 5px; font-weight: bold; }
    </style>
</head>
<body>

<h1>Filter Cafes</h1>

<!-- Filter Form -->
<form method="POST" action="">
    <div class="filter-group">
        <label for="distance">Distance:</label>
        <select name="distance" id="distance">
            <option value="any" <?= $distance == 'any' ? 'selected' : '' ?>>Any Distance</option>
            <option value="1 mile" <?= $distance == '1 mile' ? 'selected' : '' ?>>1 Mile</option>
            <option value="2 mile" <?= $distance == '2 mile' ? 'selected' : '' ?>>2 Miles</option>
            <option value="3 mile" <?= $distance == '3 mile' ? 'selected' : '' ?>>3 Miles</option>
            <option value="5 mile" <?= $distance == '5 mile' ? 'selected' : '' ?>>5 Miles</option>
        </select>
    </div>

    <div class="filter-group">
        <label for="ambience">Ambience:</label>
        <select name="ambience" id="ambience">
            <option value="">--Select Ambience--</option>
            <option value="quiet & cozy" <?= $ambience == 'quiet & cozy' ? 'selected' : '' ?>>Quiet & Cozy</option>
            <option value="modern & lively" <?= $ambience == 'modern & lively' ? 'selected' : '' ?>>Modern & Lively</option>
            <option value="classic & refined" <?= $ambience == 'classic & refined' ? 'selected' : '' ?>>Classic & Refined</option>
            <option value="artistic & eclectic" <?= $ambience == 'artistic & eclectic' ? 'selected' : '' ?>>Artistic & Eclectic</option>
        </select>
    </div>

    <div class="filter-group">
        <label for="meals">Meals:</label>
        <select name="meals[]" id="meals" multiple>
            <?php foreach ($meal_options as $meal): ?>
                <option value="<?= htmlspecialchars($meal) ?>" <?= in_array($meal, $selected_meals) ? 'selected' : '' ?>>
                    <?= htmlspecialchars($meal) ?>
                </option>
            <?php endforeach; ?>
        </select>
    </div>

    <div class="filter-group">
        <label for="drinks">Drink Types:</label>
        <select name="drinks[]" id="drinks" multiple>
            <?php foreach ($drink_options as $drink): ?>
                <option value="<?= htmlspecialchars($drink) ?>" <?= in_array($drink, $selected_drinks) ? 'selected' : '' ?>>
                    <?= htmlspecialchars($drink) ?>
                </option>
            <?php endforeach; ?>
        </select>
    </div>

    <div class="filter-group">
        <label for="good_for">Good For:</label>
        <select name="good_for[]" id="good_for" multiple>
            <?php foreach ($good_for_options as $good_for): ?>
                <option value="<?= htmlspecialchars($good_for) ?>" <?= in_array($good_for, $selected_good_for) ? 'selected' : '' ?>>
                    <?= htmlspecialchars($good_for) ?>
                </option>
            <?php endforeach; ?>
        </select>
    </div>

    <div class="filter-group">
        <label for="amenities">Amenities:</label>
        <select name="amenities[]" id="amenities" multiple>
            <?php foreach ($amenity_options as $amenity): ?>
                <option value="<?= htmlspecialchars($amenity) ?>" <?= in_array($amenity, $selected_amenities) ? 'selected' : '' ?>>
                    <?= htmlspecialchars($amenity) ?>
                </option>
            <?php endforeach; ?>
        </select>
    </div>

    <button type="submit">Filter</button>
</form>

<!-- Results Table -->
<?php if ($result && $result->num_rows > 0): ?>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Distance</th>
                <th>Ambience</th>
                <th>Rating</th>
                <th>Sponsored</th>
            </tr>
        </thead>
        <tbody>
        <?php while ($row = $result->fetch_assoc()): ?>
            <tr>
                <td><?= htmlspecialchars($row['cafe_id']) ?></td>
                <td><?= htmlspecialchars($row['name']) ?></td>
                <td><?= htmlspecialchars($row['address']) ?></td>
                <td><?= htmlspecialchars($row['distance_category']) ?></td>
                <td><?= htmlspecialchars($row['ambience']) ?></td>
                <td><?= htmlspecialchars($row['rating']) ?></td>
                <td><?= $row['is_sponsored'] == 1 ? 'Yes' : 'No' ?></td>
            </tr>
        <?php endwhile; ?>
        </tbody>
    </table>
<?php else: ?>
    <p>No cafes found matching your criteria.</p>
<?php endif; ?>

</body>
</html>

<?php
// Close the database connection
$conn->close();
?>

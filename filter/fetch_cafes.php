<?php
$servername = "localhost"; 
$username = "root"; 
$password = "root"; 
$dbname = "brewmatch"; 

header('Content-Type: application/json; charset=utf-8');

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die('connection failed'. $conn->connect_error);
}

$sql = "
    SELECT DISTINCT bc.*,
           GROUP_CONCAT(DISTINCT cm.meal_type) as meals,
           GROUP_CONCAT(DISTINCT cd.drink_type) as drinks,
           GROUP_CONCAT(DISTINCT cg.good_for) as good_for,
           GROUP_CONCAT(DISTINCT ca.amenity) as amenities
    FROM brewmatch_cafes bc
    LEFT JOIN cafe_meals cm ON bc.cafe_id = cm.cafe_id
    LEFT JOIN cafe_drinks cd ON bc.cafe_id = cd.cafe_id
    LEFT JOIN cafe_good_for cg ON bc.cafe_id = cg.cafe_id
    LEFT JOIN cafe_amenities ca ON bc.cafe_id = ca.cafe_id
    GROUP BY bc.cafe_id
";

// cant do open/close for the list cuz not all cafes have the hours data :'(

$result = $conn->query($sql);

$cafes = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

        $mealsArray = [];  
        $drinksArray = [];
        $goodForArray = [];
        $amenityArray = []; 
        
        $mealsString = $row['meals']; 
        if ($mealsString) {
            $mealsArray = explode(',', $mealsString);
        }
        
        $drinksString = $row['drinks']; 
        if ($drinksString) {
            $drinksArray = explode(',', $drinksString); 
        }

        $goodForString = $row['good_for']; 
        if ($goodForString) {
            $goodForArray = explode(',', $goodForString); 
        }

        $amenitiesString = $row['amenities']; 
        if ($amenitiesString) {
            $amenityArray = explode(',', $amenitiesString); 
        }

        $cafes[] = [
            'id' => $row['cafe_id'],
            'name' => $row['name'],
            'location' => [
                'city' => "Oakville",
                'distance' => $row['distance_category']
            ],
            'rating' => $row['rating'],
            'meals' => $mealsArray,
            'drinks' => $drinksArray,
            'good_for' => $goodForArray,
            'amenities' => $amenityArray,
            'ambience' => $row['ambience']
        ];
    }
}

echo json_encode($cafes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

$conn->close();
?>
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

$sql = "SELECT DISTINCT bc.* 
        FROM brewmatch_cafes bc
        LEFT JOIN cafe_meals cm ON bc.cafe_id = cm.cafe_id
        LEFT JOIN cafe_drinks cd ON bc.cafe_id = cd.cafe_id
        LEFT JOIN cafe_good_for cg ON bc.cafe_id = cg.cafe_id
        LEFT JOIN cafe_amenities ca ON bc.cafe_id = ca.cafe_id
        WHERE 1";

// need -> name, rating, city, distance -> cant do open/close cuz not all cafes have the hours data :'(

$result = $conn->query($sql);

$cafes = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $cafes[] = [
            'id' => $row['cafe_id'],
            'name' => $row['name'],
            'location' => [
                'city' => "Oakville",
                'distance' => $row['distance_category']
            ],
            'rating' => $row['rating']
        ];
    }
}

echo json_encode($cafes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

$conn->close();
?>
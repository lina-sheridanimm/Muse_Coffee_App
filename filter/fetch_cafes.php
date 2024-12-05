<?php
$servername = "localhost"; 
$username = "root"; 
$password = "root"; 
$dbname = "brewmatch"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT name FROM brewmatch_cafes";
$result = $conn->query($sql);

$cafes = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $cafes[] = $row['name']; 
    }
}

echo json_encode($cafes);

$conn->close();
?>

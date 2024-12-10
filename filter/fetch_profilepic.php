<?php
session_start();

header('Content-Type: application/json');

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
} else {
    echo json_encode(['error' => 'User not logged in']);
    exit();
}

$host = "localhost";        
$username = "root";       
$password = "root";           
$database = "brewmatch";    

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query = "SELECT portrait_image FROM brewmatch_users WHERE user_id = '$user_id'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $portrait_image = $row['portrait_image'];
    echo json_encode(['portrait_image' => $portrait_image]);
}

$conn->close();
?>

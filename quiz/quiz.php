<?php

session_start();

$host = "localhost";      
$username = "root";       
$password = "root";           
$database = "brewmatch";   

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (!isset($_SESSION['user_id'])) {
    die("Error: User not logged in.");
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user_id = $_SESSION['user_id'];

    if (isset($_POST['personality_type_id'])) {
        $personality_type_id = intval($_POST['personality_type_id']);

        $query = "INSERT INTO user_personality_results (user_id, personality_type_id, test_date) VALUES (?, ?, NOW())";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ii", $user_id, $personality_type_id);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Quiz result saved successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error saving quiz result: " . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Personality type ID not provided."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}

$conn->close();
?>

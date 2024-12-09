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

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $email = $conn->real_escape_string($_POST['email']);

    $query = "SELECT * FROM brewmatch_users WHERE email = '$email'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        header("Location: ../filter/filter.html");
        exit();
    } else {
        header("Location: emaillogin.html?error=invalid_email");
        exit();
    }
}

$conn->close();
?>

<?php
$hostname = "localhost";
$username = "root";
$db = "hangman_game";
$pw = "";

$con = mysqli_connect($hostname, $username, $pw, $db);

if (!$con) {
    die(json_encode(["error" => "Error connecting to database: " . mysqli_connect_error()]));
}
?>
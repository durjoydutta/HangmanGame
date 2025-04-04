<?php
header('Content-Type: application/json');

include("database.php");

//get parameter k
$k = isset($_GET['k']) ? intval($_GET['k']) : 5;

//fetch k random words
$query = "SELECT word FROM words ORDER BY RAND() LIMIT $k";
$result = mysqli_query($con, $query);

$words = [];
while ($row = mysqli_fetch_assoc($result)) {
    $words[] = $row['word'];
}

echo json_encode($words);

mysqli_close($con);

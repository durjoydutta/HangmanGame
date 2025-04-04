<?php
include("database.php");

// Create the table if it doesn't exist
mysqli_query($con, "CREATE TABLE IF NOT EXISTS words (
    id INT AUTO_INCREMENT PRIMARY KEY,
    word VARCHAR(10) NOT NULL
)");

// Read the file
$file = "words.txt"; // Replace with the path to your file
if (!file_exists($file)) {
    die("File not found: $file");
}

$words = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

foreach ($words as $word) {
    $word = trim($word);
    $length = strlen($word);

    // Insert words of length between 4 and 10
    if ($length >= 4 && $length <= 10) {
        $word = mysqli_real_escape_string($con, $word);
        $query = "INSERT INTO words (word) VALUES ('$word')";
        mysqli_query($con, $query);
    }
}

echo "Words have been successfully stored in the database.";

mysqli_close($con);

<?php
session_start();
if (!$_SESSION["id"]) {
    header("Location: login.php");
    exit();
}

include("database.php");

if ($_SESSION["id"]) {
    $query = "SELECT * FROM leaderboard";
    $res = mysqli_query($con, $query);
    if (mysqli_num_rows($res) > 0) {
        echo "<table border='1'>";
        echo "<tr><th>Username</th><th>Total Games</th><th>Average Score</th></tr>";
        while ($row = mysqli_fetch_assoc($res)) {
            echo "<tr><td>{$row['username']}</td><td>{$row['total_games']}</td><td>{$row['average_score']}</td></tr>";
        }
        echo "</table>";
    }
}

mysqli_close($con);

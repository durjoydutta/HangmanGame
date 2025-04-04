<?php
session_start();
if (!isset($_SESSION["id"])) {
  header("Location: login.php");
  exit();
}

include("database.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hangman by DDC</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
    rel="stylesheet" />
  <link rel="stylesheet" href="assets/style.css" />
  <script src="assets/script.js"></script>
</head>

<body>
  <div class="game-container">
    <div class="title-container">
      <h2>Hangman Game</h2>
      <h3>by DDC</h3>
    </div>
    <div class="profile">
      <?php if ($_SESSION["username"]) echo explode(" ", trim($_SESSION["username"]))[0] ?>
      <form action="logout.php" method="get">
        <button type="submit" name="logout">Logout</button>
      </form>
    </div>
    <div id="guess"></div>
    <div class="lives-container">
      <div id="lives"></div>
    </div>
    <div id="avgScore"></div>
    <input type="button" value="New Game" onclick="startNewGame()" />
    <div class="keyboard" id="keyboard" style="display: none"></div>
  </div>
</body>

</html>
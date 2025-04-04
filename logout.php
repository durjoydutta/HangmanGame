<?php
if (isset($_GET["logout"])) {
    header("Location: login.php");
    mysqli_close($con);
    session_destroy();
    exit();
}

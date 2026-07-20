<?php
$host = "junmo.chmamsqk8trk.ap-northeast-3.rds.amazonaws.com"; // 예: mydb.xxxx.ap-northeast-2.rds.amazonaws.com
$user = "admin";
$pw = "jjunmo08!!";
$dbName = "slog_db";

$conn = new mysqli($host, $user, $pw, $dbName);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
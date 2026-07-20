<?php
$host = "RDS_엔드포인트_주소"; // 예: mydb.xxxx.ap-northeast-2.rds.amazonaws.com
$user = "마스터사용자명";
$pw = "비밀번호";
$dbName = "slog_db";

$conn = new mysqli($host, $user, $pw, $dbName);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
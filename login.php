<?php
header('Content-Type: application/json');
include 'db.php';

$data = json_decode(file_get_contents("php://input"));
$id = $data->id;
$pw = $data->password;

$sql = "SELECT * FROM users WHERE id='$id' AND password='$pw'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode(["status" => "success", "user" => $user]);
} else {
    echo json_encode(["status" => "error", "message" => "아이디/비밀번호 불일치"]);
}
$conn->close();
?>
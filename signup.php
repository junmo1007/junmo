<?php
header('Content-Type: application/json');
include 'db.php';

// 프론트엔드에서 보낸 JSON 데이터 받기
$data = json_decode(file_get_contents("php://input"));

$id = $data->id;
$name = $data->name;
$pw = $data->password;
$bio = "천안상업고등학교 학생";
$pic = "";

// ⚠️ 발표용 야매 쿼리 (실무에선 절대 이렇게 쓰면 안 됨)
$sql = "INSERT INTO users (id, name, password, bio, pic) VALUES ('$id', '$name', '$pw', '$bio', '$pic')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
$conn->close();
?>
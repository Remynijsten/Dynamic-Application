<?php 

include '../model/connection.php';

switch($_POST['function']){
	case "read":
		readAllUsers();
	break;

	case "select":
		readSelectUsers($_POST);
	break;

}

function readAllUsers(){
	global $conn;

	$stmt = $conn->prepare("SELECT * FROM `characters` ORDER BY name ASC");
	$stmt->execute();
	$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
	print_r(json_encode($result));
}

function readSelectUsers($data){
	global $conn;

	$stmt = $conn->prepare("SELECT * FROM `characters` WHERE id = :id");
	$stmt->bindParam(':id', $data['id']);
	$stmt->execute();
	$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
	print_r(json_encode($result));
}
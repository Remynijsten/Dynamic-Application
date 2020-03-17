<?php 

include '../model/connection.php';

switch($_POST['function']){
	case "read":
		readUsers();
	break;
}



function readUsers(){
	global $conn;

	$stmt = $conn->prepare("SELECT * FROM `characters` ORDER BY name ASC");
	$stmt->execute();
	$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
	print_r(json_encode($result));
}
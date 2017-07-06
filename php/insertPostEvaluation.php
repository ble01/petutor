<?php
include("dbConnect.php"); //Establishing connection with our database

// $id = $_POST['id'];
$user_id = $_POST['user_id'];
$query_id = $_POST['query_id'];
$feedback = $_POST['feedback'];
 
echo $id. " " .$user_id. " " .$feedback;
//$con = mysqli_connect("localhost","root","","tutor");  //server,username,password,DB_name

// $sql = "INSERT INTO post_evaluation(id, user_id, query_id, feedback) VALUES('".$id."','".$user_id."','".$query_id."','".$feedback."')";
$sql = "INSERT INTO post_evaluation(user_id, query_id, feedback) VALUES('".$user_id."','".$query_id."','".$feedback."')";
	
mysqli_query($con, $sql);
mysqli_close($con);

?>

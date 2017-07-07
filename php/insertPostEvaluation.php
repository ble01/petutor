<?php
include("dbConnect.php"); //Establishing connection with our database

// $id = $_POST['id'];
$user_id = $_POST['user_id'];
$query_id = $_POST['query_id'];
$coverage = $_POST['coverage'];
$feedback = $_POST['feedback'];
 
echo $id. " " .$user_id. " " .$feedback;
//$con = mysqli_connect("localhost","root","","tutor");  //server,username,password,DB_name
 
$sql = "INSERT INTO post_evaluation(user_id, query_id, coverage, feedback) VALUES('".$user_id."','".$query_id."','".$coverage."','".$feedback."')";
	
mysqli_query($con, $sql);
mysqli_close($con);

?>
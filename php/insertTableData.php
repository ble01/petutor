<?php

$result_id = $_POST['result_id'];
$method_id = $_POST['method_id'];
$query_id = $_POST['query_id'];
$docID = $_POST['docID'];
$rank = $_POST['rank'];

echo $result_id. " " .$method_id. " " .$query_id. " " .$docID. " " .$rank;
$con = mysqli_connect("localhost","root","","tutor");  //server,username,password,DB_name

//$sql = "INSERT INTO experience(query, resource) VALUES('".$searchTerm."','".$conceptTerm."')"; //'resource':$scope.books.chapterTitle

$sql = "INSERT INTO result(result_id, method_id, query_id, docID, rank) VALUES('".$result_id."','".$method_id."','".$query_id."','".$docID."','".$rank."')";
	
mysqli_query($con, $sql);
mysqli_close($con);

?>
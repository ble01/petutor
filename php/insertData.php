<?php

$searchTerm = $_POST['searchTerm'];
$resource = $_POST['resource'];
//$conceptTerm = $_POST['conceptTerm'];

echo $searchTerm. " " .$resource;
$con = mysqli_connect("localhost","root","","tutor");

$sql = "INSERT INTO experience(query, resource) VALUES('".$searchTerm."','".$conceptTerm."')"; //'resource':$scope.books.chapterTitle
//$sql = "INSERT INTO experience(query) VALUES('".$searchTerm."')";

 
mysqli_query($con, $sql);
mysqli_close($con);

?>
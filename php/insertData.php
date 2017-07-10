<?php

$searchTerm = $_POST['searchTerm'];
$resource = $_POST['resource'];

echo $searchTerm. " " .$resource;
$con = mysqli_connect("localhost","root","","tutor");

$sql = "INSERT INTO experience(query, resource) VALUES('".$searchTerm."','".$conceptTerm."')"; 
 
mysqli_query($con, $sql);
mysqli_close($con);

?>
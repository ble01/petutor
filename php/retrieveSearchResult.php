<?php

include("dbConnect.php"); //Establishing connection with our database

//header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");
 
$request = json_decode( file_get_contents('php://input') );
 
$query_id = $request->query_id;

//$con = mysqli_connect("localhost","root","","tutor"); //server,username,password,DB_name //

$query = "SELECT distinct(docID) FROM `result` WHERE rank BETWEEN 1 AND 3 AND query_id = '$query_id'";
$result = mysqli_query($con, $query) or die('error getting data');
 
$outp = "";
while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
   if ($outp != "") {$outp .= ",";}
    $outp .= '{"docID":"'  . $row["docID"] . '"}';  
}
 
$outp = '{"theDocs":['.$outp.']}';

mysqli_close($con);

echo($outp);

?>

<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
//$mysqli = new mysqli("localhost", "root", "", "tutor");


//$query_id = 25;//$_GET["query_id"];
$request = json_decode( file_get_contents('php://input') );
//echo 'request' . $request;
$query_id = $request->query_id;

//echo 'here' . $query_id;
//echo $_POST['query_id']; 

$con = mysqli_connect("localhost","root","","tutor"); //server,username,password,DB_name //

$query = "SELECT distinct(docID) FROM `result` WHERE rank BETWEEN 1 AND 3 AND query_id = '$query_id'";
$result = mysqli_query($con, $query) or die('error getting data');
// echo $query_id;
$outp = "";
while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
   if ($outp != "") {$outp .= ",";}
    $outp .= '{"docID":"'  . $row["docID"] . '"}'; 
	//echo $row['docID'];
	//echo "\n";
}
 
$outp = '{"theDocs":['.$outp.']}';

mysqli_close($con);

echo($outp);

?>
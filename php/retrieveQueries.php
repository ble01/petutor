<?php
include("dbConnect.php"); //Establishing connection with our database

//header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");

//$con = mysqli_connect("localhost","root","","tutor"); //server,username,password,DB_name

$sql = $con->query("SELECT query_id, query_desc FROM query");

$outp = "";
while($rs = $sql -> fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"query_id":"'  . $rs["query_id"] . '",';
    $outp .= '"query_desc":"'   . $rs["query_desc"]        . '"}';     
}

$outp = '{"theQueries":['.$outp.']}';
 
mysqli_close($con);

echo($outp);
?>
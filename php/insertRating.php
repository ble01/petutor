<?php
include("dbConnect.php"); //Establishing connection with our database

$user_id = $_POST['user_id'];
$query_id = $_POST['query_id'];
$query_desc = $_POST['query_desc'];
$refined_query = $_POST['refined_query'];
$docID = $_POST['docID'];
$rating = $_POST['rating'];
$displayIndex = $_POST['displayIndex'];
//user_id, query_id, query_desc, refined_query, docID, rating, displayIndex
$ip = ""; 

echo $user_id. " " .$query_id. " " .$docID. " " .$rating;

//$con = mysqli_connect("localhost","root","","tutor");  //server,username,password,DB_name
$ip = $_SERVER["REMOTE_ADDR"];
echo $ip;
//consider writing the ip address to a new column in the DB, make a column of size 45
if (isset($_POST['rating'])){ 
$query = "SELECT * from user_input WHERE query_id = '$query_id' AND docID = '$docID'";
 $result=mysqli_query($con,$query);
	 
	   if(mysqli_num_rows($result) > 0)
		{
		 echo "Document already rated. ";
		$query = "UPDATE user_input SET rating='$rating' WHERE query_id = '$query_id' AND docID = '$docID'";
		 echo "\n We update rating as : " .$query_id. " " .$query_desc. " " .$refined_query. " " .$docID. " " .$rating. " " .$displayIndex;
		}
	  else{
		 echo "Rating does not exist. ";
		 $query = "INSERT INTO user_input (user_id, query_id, query_desc, refined_query, docID, rating, displayIndex) VALUES('".$user_id."','".$query_id."','".$query_desc."','".$refined_query."','".$docID."','".$rating."','".$displayIndex."')";
		 echo "\n New rating data inserted: ".$user_id. " " .$query_id. " " .$query_desc. " " .$refined_query. " " .$docID. " " .$rating. " " .$displayIndex;	
	  }
	
	mysqli_query($con, $query);
}

mysqli_close($con);

?>
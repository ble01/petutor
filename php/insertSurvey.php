<?php
include("dbConnect.php"); //Establishing connection with our database

// define variables and set to empty values
$consentErr = $roleErr = $qualificationErr = $experienceErr = $expertiseErr = "";
$consent = $role = $qualification = $experience = $expertise = "";

$ip = ""; 
$user_id = $_POST['user_id'];
$ip = $_SERVER["REMOTE_ADDR"];
$date = gmdate("l jS \of F Y h:i:s A");
$consent = $_POST['consent'];
$role = $_POST['role'];
$qualification = $_POST['qualification'];
$experience = $_POST['experience'];
$expertise = $_POST['expertise']; 

//echo $user_id. " " .$consent. " " .$role. " " .$qualification. " " .$experience. " " .$expertise;

 if(isset($_POST['consent'])){ 
	 
	 $sql = "INSERT INTO survey (user_id, ip, date, consent, role, qualification, experience, expertise) VALUES('".$user_id."','".$ip."','".$date."','".$consent."','".$role."','".$qualification."','".$experience."','".$expertise."')"; 
 
 } 

mysqli_query($con, $sql);
mysqli_close($con);

echo "Data successfully inserted";

?>
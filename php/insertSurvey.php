<?php
include("dbConnect.php"); //Establishing connection with our database

// define variables and set to empty values
$consentErr = $roleErr = $qualificationErr = $experienceErr = $expertiseErr = "";
$consent = $role = $qualification = $experience = $expertise = "";

$user_id = $_POST['user_id'];
$consent = $_POST['consent'];
$role = $_POST['role'];
$qualification = $_POST['qualification'];
$experience = $_POST['experience'];
$expertise = $_POST['expertise']; 
$ip = ""; 

echo $user_id. " " .$consent. " " .$role. " " .$qualification. " " .$experience. " " .$expertise;
$ip = $_SERVER["REMOTE_ADDR"];
 
 if(isset($_POST['consent'])){ 
	 
	 $sql = "INSERT INTO survey (ip, user_id, consent, role, qualification, experience, expertise) VALUES('".$ip."','".$user_id."','".$consent."','".$role."','".$qualification."','".$experience."','".$expertise."')"; 
 
 } 

mysqli_query($con, $sql);
mysqli_close($con);

echo "Data successfully inserted";

?>
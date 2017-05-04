<?php
 
// define variables and set to empty values
$consentErr = $roleErr = $qualificationErr = $experienceErr = $expertiseErr = "";
$consent = $role = $qualification = $experience = $expertise = "";

$user_id = $_POST['user_id'];
$consent = $_POST['consent'];
$role = $_POST['role'];
$qualification = $_POST['qualification'];
$experience = $_POST['experience'];
$expertise = $_POST['expertise']; 

echo $user_id. " " .$consent. " " .$role. " " .$qualification. " " .$experience. " " .$expertise;

$con = mysqli_connect("localhost","root","","tutor"); 
// //if(empty($_POST['consent'])) //{ //$consentErr = "Consent not given"; //$error=true; //} //else //{ //$consent = $_POST['consent']; //}

//if(isset($_POST['submit'])){
 if(isset($_POST['consent'])){ 
	 
	 $sql = "INSERT INTO survey (user_id, consent, role, qualification, experience, expertise) VALUES('".$user_id."','".$consent."','".$role."','".$qualification."','".$experience."','".$expertise."')"; 
//	 mysqli_query($con, $sql); 
 } 

mysqli_query($con, $sql);
mysqli_close($con);

echo "Data successfully inserted";

?>
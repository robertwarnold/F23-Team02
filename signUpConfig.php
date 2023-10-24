<?php 
  $conn = mysqli_connect('team02-rds.cobd8enwsupz.us-east-1.rds.amazonaws.com','baath','team02b44th','team02RDS');
  
  if(isset($_POST['submit'])) {
    $fName = $_POST['fName'];
    $lName = $_POST['lName'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $password = $_POST['password'];
    $cPassword = $_POST['cPassword'];

    if (strcmp($password, $cPassword) == 1) {
      echo("Passwords do not match.");
    }

    $query = "INSERT into AccountInfo(Email, FirstName, LastName, Phone) VALUE ('$email','$fName','$lName','$phone');";
    mysqli_query($conn, $query);
  }
?>
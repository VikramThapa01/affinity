<?php
$servername = "localhost";
$username = "root";
$password = "V!kr@m@79";
$db_name = "Form";

$conn = new mysqli($servername, $username, $password,$db_name);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

//print_r($_POST);

if(isset($_POST) && !empty($_POST)){
  $returnArr=array();
  $data = $_POST;
  $sql = "INSERT INTO info (first_name, last_name, emailid, phone, gender, marks, age) VALUES ('".$data['first_name']."', '".$data['last_name']."', '".$data['email']."','".$data['phone']."','".$data['gender']."','".$data['marks']."','".$data['age']."')";
  if (mysqli_query($conn, $sql)) {
    $returnArr['error_code'] = 0;
    $returnArr['error'] = "New record has been added successfully !";
  } else {
    $returnArr['error_code'] = 1;
    $returnArr['error'] = "Error: " . $sql . ":-" . mysqli_error($conn);
  }
  
}

  $selec_data = [];
  $sel_query = "select * from info order by id desc";
  $result = $conn->query($sel_query);

  if ($result->num_rows > 0) {
  
    while($row = $result->fetch_assoc()) {
        $selec_data[] = $row;
      }
    } 

    $returnArr['select'] = $selec_data;
    echo json_encode($returnArr);
    mysqli_close($conn);

?>

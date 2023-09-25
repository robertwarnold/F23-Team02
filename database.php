<?php
    #connect to database
    function db_connect(){
        $HOST = 'team02-rds.cobd8enwsupz.us-east-1.rds.amazonaws.com';
        $USER = 'baath';
        $PASS = 'team02b44th';
        $DB = 'team02RDS';
        $conn = new mysqli($HOST, $USER, $PASS, $DB);
        if ($conn->connect_error){
            die("Connection failed: " . $conn->connect_error );
        } else{
            return $conn;
        }
    }

    #fetch data from about page
    function fetch_about_page(){
        $conn = db_connect();

        if (empty($conn)){
            $message = $conn->connect_error;
        }
        else {
            $query = 'SELECT * FROM AboutPage ORDER BY Version DESC LIMIT 1';
            $result = $conn->query($query);
            if ($result){
                if ($result->num_rows > 0){
                    $message = $result->fetch_assoc();
                }
                else {
                    $message = 'No data Available';
                }
            }
            else {
                $message = mysqli_error($conn);
            }
        }
        return $message;
    }
?>
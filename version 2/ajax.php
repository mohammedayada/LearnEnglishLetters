<?php
    if(isset($_POST['data'])){
        if(get_magic_quotes_gpc())
        $data = stripslashes($_POST['data']);
        else
        $data = $_POST['data'];
        $data = json_decode($data,true);

        $conn = new mysqli("localhost", "root", "root","web2");
        if($conn->connect_error){
            die($conn->connect_error);
        }

        $Type = $data['getEventType'];
        $Target = $data['EgetEventTarget'];// ممكن تستغني عنها لانها بتعطي اجابة غير مرضية 
        $Time = $data['getEventTime'];
        $Val = $data['getEventValue'];

        $sql = "INSERT INTO web (_Time, _Type, _Target) VALUES ('$Time', '$Type', '$Val');";
        $conn->query($sql);
        if($conn->affected_rows = 0){
            echo "Sorry: Problem With Insertion";
        }
    }

    if(isset($_GET['data'])){
        $sql = "Select * from web";
        $conn = new mysqli("localhost", "root", "root","web2");
        if($conn->connect_error){
            die($conn->connect_error);
        }
        if ($result = $conn->query($sql)){
            $rows = array();
            if($result->num_rows > 0){
                while($row = $result->fetch_assoc()){
                    array_push($rows, $row);
                }
                echo json_encode($rows);
            }
        }
        else{
            echo "No Data to Retrieve";
        }
    }
?>

<?php
    declare (strict_types=1);
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    include '../inc.db.php';

    $data = json_decode(file_get_contents('php://input')); // instead of $_POST with AngularJS
    $name = sanitize($data->name);
    $description = sanitize($data->description);
    $area = sanitize($data->area);
    $manager = sanitize($data->manager);

    $error = 'INSERT failed in insertProject.php'; 

    try {
        $sql = 'insert into projecttracker.project (name, description, area, manager) values (:name, :description, :area, :manager)';
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':area', $area);
        $stmt->bindParam(':manager', $manager);
        $n = $stmt->execute();
        $pdo = null;
        if($n == 1) {
            echo 'success';
            // header('Location: index.php');
        } else {
            echo $error;
        }
    } catch(Exception $e) {
        echo $e->getMessage();
    }
?>

<!-- declare (strict_types=1);
    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    function sanitize(string $value): string {
        return htmlspecialchars(stripslashes(trim($value)));
    }

    $connect = mysqli_connect('localhost', 'root', 'root', 'projecttracker');  
    $data = json_decode(file_get_contents('php://input')); // instead of $_POST with AngularJS

    if($data) {
        try {

            $query = 'insert into projecttracker.project (name, description, area, manager) values ('$name', '$description', '$area', '$manager')';
            if(mysqli_query($connect, $query)) {
                echo 'success';
            } else {
                echo $connect->error;
            }
        } catch(Exception $e) {
            echo 'Database error in php/insertProject.php: ' . $e->getMessage();
        }        
    } -->
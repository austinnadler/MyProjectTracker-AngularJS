<?php
    declare (strict_types=1);
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    include '../inc.db.php';

    $data = json_decode(file_get_contents('php://input')); // instead of $_POST with AngularJS
    $name = sanitize($data->name);
    $description = sanitize($data->description);
    $projectId = sanitize($data->projectId);

    try {
        $sql = 'insert into projecttracker.task (project$id, name, description) values (:projectId, :name, :description)';
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':projectId', $projectId);
        $n = $stmt->execute();
        $pdo = null;
        if($n == 1) {
            echo 'success';
            // header('Location: index.php');
        } else {
            echo 'INSERT failed in php/insertProject.php';
        }
    } catch(Exception $e) {
        echo 'Database error in php/insertProject.php: ' . $e->getMessage();
    }
?>
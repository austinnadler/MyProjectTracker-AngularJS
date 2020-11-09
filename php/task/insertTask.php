<?php
    declare (strict_types=1);
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    include '../inc.db.php';

    $data = json_decode(file_get_contents('php://input')); // instead of $_POST with AngularJS
    $name = sanitize($data->name);
    $description = sanitize($data->description);
    $projectId = sanitize($data->projectId);

    $error = 'INSERT failed in insertProject.php';

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
        } else {
            echo $error;
        }
    } catch(Exception $e) {
        echo $e->getMessage();
    }
?>
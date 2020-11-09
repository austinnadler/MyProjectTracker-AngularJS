<?php
    declare (strict_types=1);
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    include '../inc.db.php';

    $data = json_decode(file_get_contents('php://input')); // instead of $_POST with AngularJS
    $id = sanitize($data->id);
    $name = sanitize($data->name);
    $description = sanitize($data->description);

    $error = 'UPDATE failed in updateTask.php';

    try {
        $sql = 'update projecttracker.task set name=:name, description=:description where id=:id';
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':description', $description);
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
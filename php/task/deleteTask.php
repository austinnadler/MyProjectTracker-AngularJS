<?php
    declare (strict_types=1);
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    include '../inc.db.php';

    $data = json_decode(file_get_contents('php://input')); // instead of $_POST with AngularJS
    $id = sanitize($data->id);

    $error = 'DELETE failed in deleteTask.php';

    try {
        $n = 0;
        $sql = 'delete from projecttracker.task where id=:id;'; // Delete its tasks first
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id);
        $n += $stmt->execute();
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
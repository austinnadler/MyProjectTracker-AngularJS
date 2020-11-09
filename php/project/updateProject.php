<?php
    declare (strict_types=1);
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    include '../inc.db.php';

    $data = json_decode(file_get_contents('php://input')); // instead of $_POST with AngularJS
    $id = sanitize($data->id);
    $name = sanitize($data->name);
    $description = sanitize($data->description);
    $area = sanitize($data->area);
    $manager = sanitize($data->manager);

    $error = 'UPDATE failed in updateProject.php';

    try {
        $sql = 'update projecttracker.project set name=:name, area=:area, manager=:manager, description=:description where id=:id';
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id);
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
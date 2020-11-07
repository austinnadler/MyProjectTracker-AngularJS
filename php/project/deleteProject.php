<?php
    declare (strict_types=1);
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    include '../inc.db.php';

    $data = json_decode(file_get_contents('php://input')); // instead of $_POST with AngularJS
    $id = sanitize($data->id);

    try {
        $n = 0;
        $sql = 'delete from projecttracker.task where project$id=:id;'; // Delete its tasks first
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id);
        $n += $stmt->execute();
        $sql = 'delete from projecttracker.project where id=:id;';
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id);
        $n += $stmt->execute();
        $pdo = null;
        echo 'success';
    } catch(Exception $e) {
        echo 'Database error in php/deleteProject.php: ' . $e->getMessage();
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
        $id = sanitize(mysqli_real_escape_string($connect, $data->id));
        $query = '';
        if(mysqli_query($connect, $query)) {
            echo 'success';
        } else {
            echo $connect->error;
        }
    } catch(Exception $e) {
        echo 'Database error in php/deleteProject.php: ' . $e->getMessage();
    }        
}
-->
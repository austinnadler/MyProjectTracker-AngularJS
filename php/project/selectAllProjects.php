<?php    
    declare (strict_types=1);
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    include '../inc.db.php';
    
    try {
        $sql = 'select id, name, description, area, manager from projecttracker.project';
        $statement = $pdo->query($sql);
        $rows = [];
        while($row = $statement->fetch()) {
            $rows[] = $row;
        }        
        $pdo = null;
        echo json_encode($rows);
    } catch(PDOException $e) {
        echo 'Database error in php/selectAllProjects.php: ' . $e->getMessage();
    }
?>
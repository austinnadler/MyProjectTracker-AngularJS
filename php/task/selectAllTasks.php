<?php
    declare (strict_types=1);
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    include '../inc.db.php';

    try {
        $sql = 'select t.id as task_id, t.project$id as project_id, t.name as task_name, t.description as task_desc, p.name as project_name, p.description as project_desc from projecttracker.task as t, projecttracker.project as p where p.id = t.project$id';
        $statement = $pdo->query($sql);
        $rows = [];
        while($row = $statement->fetch()) {
            $rows[] = $row;
        }        
        $pdo = null;
        echo json_encode($rows);
    } catch(PDOException $e) {
        echo 'Database error in php/selectAllTasks.php: ' . $e->getMessage();
    } 
?>

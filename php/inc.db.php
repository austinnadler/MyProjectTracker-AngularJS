<?php
    $DSN = "mysql:host=localhost;dbname:projecttracker";
    $USER = $PWD = 'root';
    $pdo = new PDO($DSN, $USER, $PWD);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    function sanitize(string $value): string {
        return htmlspecialchars(stripslashes(trim($value)));
    }
?>

<?php
//create or open the database
include('config.php');

try {
    // open the database
    $database = new PDO($config['db']);
    // Set errormode to exceptions
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $error) {
    die($error);
}
//add links table to database
$query = 'SELECT * FROM links';
try {
    $result = $database->query($query);
} catch (Exception $error) {
    die($error);
}

foreach ($result as $row) {
    print("<p>${row['short_url']} => ${row['full_url']}</p>");
}

unset($database);
?>
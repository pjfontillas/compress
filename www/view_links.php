<?php
//create or open the database
include('config.php');

try {
    $database = new SQLiteDatabase($config['db'], 0666, $error);
} catch (Exception $error) {
    die($error);
}
//add links table to database
$query = 'SELECT * FROM links';
$result = $database->query($query, SQLITE_BOTH, $error);
if ($result) {
    while ($row = $result->fetch()) {
        print("<p>{$row['short_url']} => {$row['full_url']}</p>");
    }
} else {
    die($error);
}
unset($database);
?>
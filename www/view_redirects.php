<?php
//create or open the database
include('config.php');

try {
    $database = new SQLiteDatabase($config['db'], 0666, $error);
} catch (Exception $error) {
    die($error);
}
//add links table to database
$query = 'SELECT * FROM redirects';
$result = $database->query($query, SQLITE_BOTH, $error);
if ($result) {
    while ($row = $result->fetch()) {
        print("<p>${row['short_url']} | IP: ${row['ip']} | FORWARDED FOR: ${row['proxy']} | TIME: ${row['time']}</p>");
    }
} else {
    die($error);
}
unset($database);
?>
<?php
include('config.php');

try {
    //create or open the database
    $database = new SQLiteDatabase($config['db'], 0766, $error);
} catch (Exception $error) {
    die($error);
}
// add links table to database
$query = 'CREATE TABLE links ' .
        '(full_url TEXT, short_url TEXT);';
if (!$database->queryExec($query, $error)) {
    echo "<p>${error}</p>";
} else {
    echo '<p>Successfully created \'links\' table.</p>';
}


// add redirect table to database
$query = 'CREATE TABLE redirects' .
        '(short_url TEXT, ip TEXT, proxy TEXT, time TEXT);';
if (!$database->queryExec($query, $error)) {
    echo "<p>${error}</p>";
} else {
    echo '<p>Successfully created \'redirects\' table.</p>';
}

unset($database);
?>
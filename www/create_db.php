<?php
include('config.php');

try {
    //create or open the database
    $database = new SQLiteDatabase($config['db'], 0766, $error);
} catch (Exception $error) {
    die($error);
}
//add links table to database
$query = 'CREATE TABLE links ' .
        '(full_url TEXT, short_url TEXT)';
if (!$database->queryExec($query, $error)) {
    echo $error;
} else {
    echo 'Success';
}
unset($database);
?>
﻿<?php
include('config.php');

try {
    //create or open the database
    $database = new PDO($config['db']);
    // Set errormode to exceptions
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $error) {
    die($error);
}
// add links table to database
$query = 'CREATE TABLE links ' .
        '(full_url TEXT, short_url TEXT);';
try {
    $database->exec($query);
} catch (Exception $error) {
    exit($error);
}
echo '<p>Successfully created \'links\' table.</p>';

// add redirect table to database
$query = 'CREATE TABLE redirects' .
        '(short_url TEXT, ip TEXT, proxy TEXT, time TEXT);';
try {
    $database->exec($query);
} catch (Exception $error) {
    exit($error);
}
echo '<p>Successfully created \'redirects\' table.</p>';

unset($database);
?>
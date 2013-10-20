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

// get params
$code = $_GET['code'];

$query = 'SELECT * FROM links' .
         " WHERE short_url='${code}';";
// search for shortened_url
try {
    $result = $database->query($query);
} catch (Exception $error) {
    die($error);
}

// there will only be one match
while ($row = $result->fetch()) {
    // add record of redirect
    $time = time();
    $ip = $_SERVER['REMOTE_ADDR'];
    $proxy = $_SERVER['HTTP_X_FORWARDED_FOR'];
    $query =
            'INSERT INTO redirects (short_url, ip, proxy, time)' .
            "VALUES ('${code}', '${ip}', '${proxy}', '${time}');";
    try {
        $result = $database->query($query);
    } catch (Exception $error) {
        die($error);
    }

    // redirect
    header("HTTP/1.1 301 Moved Permanently");
    header('Location: ' . $row['full_url']);
}

unset($database);


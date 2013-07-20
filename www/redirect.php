<?php
//create or open the database
include('config.php');

try {
    $database = new SQLiteDatabase($config['db'], 0666, $error);
} catch (Exception $error) {
    die($error);
}

// get params
$code = $_GET['code'];

$query = 'SELECT * FROM links' .
         " WHERE short_url='${code}';";
// search for shortened_url
$result = $database->query($query, SQLITE_BOTH, $error);
if ($result) {

    while ($row = $result->fetch()) {
        // there will only be one match
        header("HTTP/1.1 301 Moved Permanently");
        header('Location: ' . $row['full_url']);
    }

    unset($database);
} else {
    unset($database);
    die($error);
}

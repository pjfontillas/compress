<?php
/**
 * url_shortener.php
 * Requires PHP5
 * Uses SQLite
 */

ini_set('display_errors', '1'); 
ini_set('log_errors', '1'); 
error_reporting(E_ALL);
 
function generate_random_string($length) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    $string = '';    
    for ($p = 0; $p < $length; $p++) {
        $string .= $characters[mt_rand(0, strlen($characters) - 1)];
    }
    return $string;
}

function clean_input($input) {
    $input = str_replace(array('\\','\''), array('\\\\','\\\''), $input);
    $input = htmlentities($input);
    return $input;
}

// check isset $_POST and $_GET for url = $URL
if (isset($_POST['url'])){
    $URL = clean_input($_POST['url']);
} else if (isset($_GET['url'])) {
    $URL = clean_input($_GET['url']);
} else {
    die('URL is not set.');
}

// check isset $_POST and $_GET for source = $source
if (isset($_POST['source'])) {
    $source = clean_input($_POST['source']);
} else if (isset($_GET['source'])) {
    $source = clean_input($_GET['source']);
} else {
    die('source is not set.');
}

try {
  // open the database
  $database = new SQLiteDatabase('kDhdsKowm.sqlite', 0666, $error);
} catch (Exception $e) {
  die($error);
}

$searching = true;
$limit = 1000;
$length = 5;

while ($searching) {
    // create url using algo
    $shortened_URL = generate_random_string($length);

    // check against DB
    $query = 'SELECT * FROM links' .
                     ' WHERE shortened_URL="' . $shortened_URL . '"';
    if ($result = $database->query($query, SQLITE_BOTH, $error)) {
        if (sizeof($result) == 0) {
            // if not found, write pair to DB
            $query =
                'INSERT INTO links (URL, shortened_URL) ' .
                "VALUES ('$URL', '$shortened_URL');";
            if (!$database->queryExec($query, $error)) {
                die($error);
            }
            $searching = false;
        } else {
            if ($limit-- == 0) {
                $limit = 1000;
                $length++;
            }
        }
    } else {
        die($error);
    }
}

// if ajax return the shortened url string
if ($source == "ajax") {
    echo($shortened_URL);
}
// if html return web page
if ($source == "html") {
    echo(
    '<!DOCTYPE html>' .
    '<html>' .
    '<head>' .
    '<title>Shortened URL</title>' .
    '</head>' .
    '<body>' .
    '<h1>Success!</h1>' .
    "<p>Here is your shortened URL: $shortened_URL" .
    '</body>' .
    '</html>'
    );
}
?>

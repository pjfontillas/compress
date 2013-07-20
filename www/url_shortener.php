<?php
/**
 * url_shortener.php
 * Requires PHP5
 * Uses SQLite
 */

include('config.php');

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

// check isset $_POST and $_GET for url = $full_url
if (isset($_POST['url'])){
    $full_url = clean_input($_POST['url']);
} else if (isset($_GET['url'])) {
    $full_url = clean_input($_GET['url']);
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
  $database = new SQLiteDatabase($config['db'], 0766, $error);
} catch (Exception $error) {
  die($error);
}

$searching = true;
$limit = 1000;
$length = 5;

while ($searching) {
    // create url using algo
    $short_url = generate_random_string($length);

    // check against DB
    $query = 'SELECT * FROM links' .
             " WHERE short_url='${short_url}'";
    $result = $database->query($query, SQLITE_BOTH, $error);
    if ($result) {
        if (sizeof($result) == 0) {
            // if not found, write pair to DB
            $query =
                'INSERT INTO links (full_url, short_url) ' .
                "VALUES ('${full_url}', '${short_url}');";
            $result = $database->query($query, SQLITE_BOTH, $error);
            if ($error) {
                die($error);
            }
            $searching = false;
        } else {
            $limit--;
            if ($limit === 0) {
                $limit = 1000;
                $length++;
            }
        }
    } else {
        die($error);
    }
}

$short_url = $config['domain'].'/'.$short_url;

// if ajax return the shortened url string
if ($source === 'ajax') {
    echo $short_url;
}
// if html return web page
if ($source === 'html') {
    echo <<<HTML
    <!DOCTYPE html>
    <html>
    <head>
    <title>Shortened URL</title>
    </head>
    <body>
    <h1>Success!</h1>
    <p>Here is your shortened URL: <a href="${short_url}" alt="${full_url}">${short_url}</a></p>
    </body>
    </html>
HTML;
}
?>

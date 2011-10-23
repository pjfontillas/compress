<?php
try {
	//create or open the database
	$database = new SQLiteDatabase('kDhdsKowm.sqlite', 0666, $error);
} catch (Exception $e) {
	die($error);
}
//add links table to database
$query = 'SELECT * FROM links';
if($result = $database->query($query, SQLITE_BOTH, $error)) {
	while($row = $result->fetch()) {
		print("<p>{$row['URL']} => {$row['shortened_URL']}</p>");
	}
} else {
	die($error);
}
unset($database);
?>
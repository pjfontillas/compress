<?php
try {
  //create or open the database
  $database = new SQLiteDatabase('kDhdsKowm.sqlite', 0666, $error);
} catch (Exception $e) {
  die($error);
}
//add links table to database
$query = 'CREATE TABLE links ' .
         '(URL TEXT, shortened_URL TEXT)';
if(!$database->queryExec($query, $error)) {
  die($error);
} else {
	echo("Success");
}
unset($database);
?>
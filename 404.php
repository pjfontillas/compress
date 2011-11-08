<!DOCTYPE HTML>
<html>
<head>
    <title>404</title>

<?php
$resourcesPath = 'Resources/';
include $resourcesPath.'header.php';
?>

<style type="text/css">
* {
    background-color: BLACK;
    color: WHITE;
}
#message_404 {
    width: 960px;
    font-size: 1.5em;
    margin: 0px auto;
}
#message_404 h1 {
    color: RED;
}
body {
    background-color: BLACK;
}
</style>
</head>
<body>
<div id="message_404">
    <h1>404</h1>
    <h3>Sorry, we couldn't find what you were looking for.</h3>
    <p>It looks like you came from: <?php echo $_SERVER['HTTP_REFERER']; ?></p>
    <p>Maybe they have a wrong or outdated link.</p>
</div><!-- #404_message -->

<?php
include $resourcesPath.'footer.php';
?>

</body>
</html>
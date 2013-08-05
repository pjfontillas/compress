<?php

$config = array(
    'domain' => 'http://cmprss.us',
    'db' => 'db/kDhdsKowm.sqlite'
);

ini_set('display_errors', '1');
ini_set('log_errors', '1');
error_reporting(E_ALL);

function clean_input($input) {
    return htmlentities(
            str_replace(array('\\', '\''), array('\\\\', '\\\''), $input)
    );
}


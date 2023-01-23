<?php

// get the arabic word from the url parameters
$araWord = htmlentities($_GET["q"]);

// set base url
$araurl = "http://localhost:8080/api/word?q=";

// encode the arabic word and concatenate it with the base url
$araWord = urlencode($araWord);
$araurl = $araurl . $araWord;


// query the api using curl
$ch = curl_init();
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_URL, $araurl);
$response = curl_exec($ch);
curl_close($ch);


// echo the response
echo($response);

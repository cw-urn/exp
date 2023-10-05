<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = $_POST['data'];

    // Save the numbers to a text file
    file_put_contents('numbers.txt', $data);

    echo "Numbers saved: $data";
} else {
    // Read the numbers from the text file
    $storedData = file_get_contents('numbers.txt');
    echo "Stored Numbers: $storedData";
}
?>

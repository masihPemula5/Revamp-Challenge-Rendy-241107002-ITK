<?php
include 'koneksi.php';

$id = $_GET['id'];

$sql = "DELETE FROM mahasiswa WHERE id=$id";



if ($conn->query($sql) === TRUE) {
    header("Location: crud.php");

    exit;

} else {



    echo "Error: " . $conn->error;
}


$conn->close();

?>
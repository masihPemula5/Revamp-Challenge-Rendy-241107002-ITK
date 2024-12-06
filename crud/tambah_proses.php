
<?php
include 'koneksi.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Koneksi ke database

    if ($conn->connect_error) {
        echo json_encode(['success' => false]);
        exit;
    }

    // Ambil data dari POST
    $nama = $_POST['nama'];
    $nim = $_POST['nim'];
    $email = $_POST['email'];
    $nomor = $_POST['nomor'];
    $jurusan = $_POST['jurusan'];

    // Cek apakah NIM sudah ada di database
    $sql_cek = "SELECT * FROM mahasiswa WHERE nim = '$nim'";
    $result = $conn->query($sql_cek);

    header('Content-Type: application/json');

if ($result->num_rows > 0) {
    echo json_encode([
        'success' => false,
        'error' => 'NIM sudah ada di database',
    ]);
    exit;
}


    // validasi email
    $email_cek = "SELECT * FROM mahasiswa WHERE email = '$email'";
    $result_email = $conn->query($email_cek);

    header('Content-Type: application/json');

    if ($result_email->num_rows > 0) {
        echo json_encode([
            'success' => false,
            'error' => 'Email sudah ada di database',
        ]);
        exit;
    }

    // validasi NOMOR HP

$nomor_cek = "SELECT * FROM mahasiswa WHERE nomor = '$nomor'";
$result_nomor = $conn->query($nomor_cek);

header('Content-Type: application/json');

if ($result_nomor->num_rows > 0) {
    echo json_encode([
        'success' => false,
        'error' => 'Nomor Telepon sudah digunakan',
    ]);
    exit;
}

$pattern = "/^08[0-9]{8,13}$/";
if (!preg_match($pattern, $nomor)) {
    echo json_encode([
        'success' => false,
        'error' => 'Nomor Telepon',
    ]);
    exit;
};

    // Insert data ke database
    $sql = "INSERT INTO mahasiswa (nama, nim, email, nomor, jurusan) VALUES ('$nama', '$nim', '$email', '$nomor', '$jurusan')";

    if ($conn->query($sql) === TRUE) {
        // Ambil ID terakhir untuk digunakan di tabel
        $id = $conn->insert_id;

        echo json_encode([
            'success' => true,
            'id' => $id,
            'nama' => $nama,
            'nim' => $nim,
            'email' => $email,
            'nomor' => $nomor,
            'jurusan' => $jurusan,
        ]);
    } else {
        echo json_encode(['success' => false]);
    }

    $conn->close();
}
?>

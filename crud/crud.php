
<?php
session_start();
include 'koneksi.php';


// Cek apakah tabel mahasiswa kosong
$result = $conn->query("SELECT COUNT(*) AS total FROM mahasiswa");
$row = $result->fetch_assoc();
echo "<div class='sidebar'>
       <h2>Menu Dashboard</h2>
<a href='#'><i class='fas fa-home'></i>&nbsp;&nbsp;<span>Beranda</span></a>
<a href='#'><i class='fas fa-users'></i>&nbsp;&nbsp;<span>Data Mahasiswa</span></a>
<a href='#' onclick='openModal()'>  <i class='fas fa-plus'></i>&nbsp;&nbsp;<span>Tambah Data</span></a>
<a href='#' onclick='return confirmDeleteAll()'><i class='fa-solid fa-trash'></i>&nbsp;&nbsp;<span>Hapus semua Data</span></a>
<script>

</script>
        <a href='#'><i class='fas fa-cog'></i> <span>Pengaturan</span></a>
        <a href='../logout.php' onclick='return confirmLogout()'><i class='fas fa-sign-out-alt'></i> <span>Log Out</span></a>
      </div>";



echo "<div class='main-content'>";
// Jika tabel kosong, tampilkan tombol Batal Hapus
if ($row['total'] == 0) {
  echo '<form method="POST" action="batal_hapus.php">
             <button class="cancel-del" type="submit">Batal Hapus</button>
         </form>';
}

// Tampilkan tabel mahasiswa jika ada data
$query = "SELECT * FROM mahasiswa";
$result = $conn->query($query);

if ($result->num_rows > 0) {

  echo "<h2>Data Mahasiswa</h2>";
  echo "<div class='cta'>";
  echo "<a class='add-data' onclick='openModal()' ><i class='fas fa-plus'></i>&nbsp;&nbsp;Tambah Data</a>";
  echo "<button id='downloadPdf'><i class='fas fa-download'></i> Download PDF</button>";
  echo "</div>";
  echo "<table id='myTable' class='display'>";
  echo "<thead>";
  echo "<tr>
        <th>Nama</th>
        <th>NIM</th>
        <th>Email</th>
        <th>Nomor</th>
        <th>Jurusan</th>
        <th>Aksi</th> 
      </tr>";
  echo "</thead>";
  echo "<tbody>";

  while ($row = $result->fetch_assoc()) {
    echo "<tr>";
    echo "<td>" . $row['nama'] . "</td>";
    echo "<td>" . $row['nim'] . "</td>";
    echo "<td>" . $row['email'] . "</td>";
    echo "<td>" . $row['nomor'] . "</td>";
    echo "<td>" . $row['jurusan'] . "</td>";

    // Kolom Aksi dengan tautan Edit dan Hapus
    echo "<td>
    <a href='#' 
    class='editButton' onclick='openEditModal()'
style='color:white; background-color: green; padding: 5px'
                        data-id='{$row['id']}'
                        data-nama='{$row['nama']}'
                        data-nim='{$row['nim']}'
                        data-email='{$row['email']}'
                        data-nomor='{$row['nomor']}'
                        data-jurusan='{$row['jurusan']}'
    ><i class='fas fa-edit'></i> <span>Edit</span></a>
               
    <a style='color:white; background-color: red; padding: 5px; border-radius: 3px;' href='hapus.php?id=" . $row['id'] . "' onclick='return konfir(event, this)'><i class='fas fa-trash'></i> Hapus</a>
<script>
 function konfir(event, elem) {
  event.preventDefault();
  Swal.fire({
    title: 'Apakah Anda yakin ingin menghapus data ini?',
    text: 'Data yang dihapus tidak dapat dikembalikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#1b76fd',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus data!',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      // Misalnya proses penghapusan berhasil
      Swal.fire({
  title: 'Berhasil!',
  text: 'Data berhasil dihapus.',
  icon: 'success',
  showConfirmButton: false,
  timer: 1200
      }).then(() => {
        // Arahkan ke halaman yang diperlukan setelah alert sukses
        window.location.href = elem.href;
      });
    }
  });
}
</script>
          
              </td>";
    echo "</tr>";
  }
  echo "<tbody>";
  echo "</table>";
} else {
  echo "<p>Tidak ada data yang tersedia.</p>";
}
//modal tambah data
echo "<div id='modalForm' class='modal'>
        <span class='close-btn' onclick='closeModal()'>×</span>
        <div id='mediaContent' class='form-card'>
          <h2>Tambah Data</h2>
          <form id='tambahForm' action='tambah_proses.php' method='POST'>
          <input type='hidden' name='id'>
              <div class='input-group'>
                  <i class='fas fa-user'></i>
                  <input type='text' name='nama' placeholder='Nama' required>
              </div>
              <div class='input-group'>
                  <i class='fas fa-id-card'></i>
                  <input type='number' name='nim' placeholder='NIM' required>
              </div>
              <div class='input-group'>
                  <i class='fas fa-envelope'></i>
                  <input type='email' name='email' placeholder='Email' required>
              </div>
              <div class='input-group'>
                  <i class='fas fa-phone'></i>
                  <input id='nomor' type='number' name='nomor' placeholder='Nomor' required>
              </div>
              <div class='input-group'>
                  <i class='fas fa-graduation-cap'></i>
                  <input type='text' name='jurusan' placeholder='Jurusan' required>
              </div>
              <button class='btn-tambah' type='submit'>Tambah</button>
          </form>
      </div>
</div>";


// sappaan user

// Pastikan session sudah diaktifkan

$username = $_SESSION['username']; // Nama user dari session
?>
<script>
    const username  = "<?php echo $username; ?>";
</script>




<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Data Mahasiswa</title>
  <link rel="stylesheet" href="../style/index.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
    rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <!-- Tambahkan SweetAlert2 CSS -->
<link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js"></script>

  <!-- Tambahkan di bagian <head> atau sebelum tag </body> -->
  <link rel="stylesheet" href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.min.css">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>

<body>
<div id="greeting" class="greeting-text"></div>




  <!-- Modal -->
 <div id='editModal' class='editModal' style='display: none;'>
    <span class='close-btnEdit' onclick='closeModalEdit()'>×</span>
    <div id='mediaContent' class='form-card'>
      <h2>Edit Data</h2>
      <form id='editForm12' action='edit_proses.php' method='POST'>
        <input type='hidden' name='id' id="editId">
        <div class='input-group'>
          <i class='fas fa-user'></i>
          <input type='text' id="editNama" name='nama' placeholder='Nama' >
        </div>
        <div class='input-group'>
          <i class='fas fa-id-card'></i>
          <input type='text' id="editNim" name='nim' placeholder='NIM' >
        </div>
        <div class='input-group'>
          <i class='fas fa-envelope'></i>
          <input type='text' id="editEmail" name='email' placeholder='Email' >
        </div>
        <div class='input-group'>
          <i class='fas fa-phone'></i>
          <input type='text' id="editNomor" name='nomor' placeholder='Nomor' >
        </div>
        <div class='input-group'>
          <i class='fas fa-graduation-cap'></i>
          <input type='text' id="editJurusan" name='jurusan' placeholder='Jurusan' >
        </div>
        <button class='btn-tambah' type='submit'>Simpan</button>
      </form>
    </div>
  </div>






  <script>




    function openEditModal() {
      document.getElementById('editModal').style.display = 'block';
    }

    function closeModalEdit() {
      document.getElementById('editModal').style.display = 'none';
    }

    // Inisialisasi DataTables
    $(document).ready(function () {
      $('#myTable').DataTable({
        "paging": false,
        "searching": true,
        "info": true,
        "lengthChange": true,
        "pageLength": 10

      });
    });

  </script>


<script src="script.js"></script>
</body>

</html>


const modal = document.getElementById('modalForm');



function openModal() {
    modal.classList.add('active');
}
function closeModal() {
    modal.classList.remove('active');
}


window.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
    }
};


//konfirm log out

function confirmLogout() {
    event.preventDefault();
    Swal.fire({
      title: 'Yakin ingin logout?',
      text: 'Anda akan keluar dari sistem!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1b76fd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, logout!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '../logout.php';
      }
    });
  }

  // konfirm hapus semua

  function confirmDeleteAll() {
    event.preventDefault();
    Swal.fire({
      title: 'Yakin bre mau hapus semua data?',
      text: 'Data yang dihapus masih bisa di balikin si 🙄',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1b76fd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus aja bre!',
      cancelButtonText: 'Gajadi'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = 'hapus_semua.php';
      }
    });
  }
     window.onload = function() {
              const urlParams = new URLSearchParams(window.location.search);
              if (urlParams.get('success') === 'true') {
                  Swal.fire({
                      icon: 'success',
                      title: 'Berhasil!',
                      text: 'Semua data telah berhasil dihapus.',
                      showConfirmButton: false,
                      timer: 1000
                  });
              }
          };



// kode AJAX

document.getElementById('tambahForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Mencegah form reload

    // Ambil data dari form
    const formData = new FormData(this);

    // Kirim data ke proses.php menggunakan fetch (AJAX)
    fetch('tambah_proses.php', {
        method: 'POST',
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Respons gagal: ' + response.statusText);
            }
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data); // Debug respons data dari PHP
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Data berhasil ditambahkan!',
                    showConfirmButton: false,
                    timer: 1200
                });
                closeModal();

                // Tambahkan data baru ke tabel
                const table = document.querySelector('table tbody');
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${data.nama}</td>
                    <td>${data.nim}</td>
                    <td>${data.email}</td>
                    <td>${data.nomor}</td>
                    <td>${data.jurusan}</td>
                    <td>
                       <a href='#' 
    class='editButton' 
style='color:white; background-color: green; padding: 5px'
                        data-id='{$row['id']}'
                        data-nama='{$row['nama']}'
                        data-nim='{$row['nim']}'
                        data-email='{$row['email']}'
                        data-nomor='{$row['nomor']}'
                        data-jurusan='{$row['jurusan']}'
    ><i class='fas fa-edit'></i> <span>Edit</span></a>
               
    <a style='color:white; background-color: red; padding: 5px;
    border-radius: 3px;' href='hapus.php?id=" . $row['id'] . "' onclick='return konfir(event, this)'><i class='fas fa-trash'></i> Hapus</a>
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
                    </td>
                `;
                table.appendChild(row);
            } else {
                if (data.error.includes('NIM')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'NIM Sudah Digunakan!',
                        text: 'Ganti NIM dengan yang lain.'
                    });
                } else if (data.error.includes('Email')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Email Sudah Digunakan!',
                        text: 'Ganti email dengan yang lain.'
                    });
                } else if (data.error.includes('Nomor Telepon sudah digunakan')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Nomor Telepon Sudah Digunakan!',
                        text: 'Ganti nomor telepon dengan yang lain.'
                    });
                } else if (data.error.includes('Nomor Telepon')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Format Nomor Telepon Tidak Sesuai!',
                        text: 'Masukan nomor telepon dengan benar.'
                    });
                }
            }
            

        })
        .catch((error) => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Kesalahan server',
                text: 'Silakan coba lagi.'
            });
        });
});


//edit modal

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("editModal");
    const closeModal = document.getElementById("closeModal");


    const editButtons = document.querySelectorAll(".editButton");
    editButtons.forEach((button) => {
        button.addEventListener("click", function () {

            document.getElementById("editNama").value = this.getAttribute("data-nama");
            document.getElementById("editNim").value = this.getAttribute("data-nim");
            document.getElementById("editEmail").value = this.getAttribute("data-email");
            document.getElementById("editNomor").value = this.getAttribute("data-nomor");
            document.getElementById("editJurusan").value = this.getAttribute("data-jurusan");
            document.getElementById("editId").value = this.getAttribute("data-id");

        });
    });

   
    overlay.addEventListener("click", function () {
        modal.style.display = "none";
        overlay.style.display = "none";
    });
});


   



// fitur download tabel
document.getElementById("downloadPdf").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;

    // Inisialisasi dokumen PDF
    const doc = new jsPDF();

    // Tambahkan judul
    doc.text("Data Mahasiswa", 14, 10);

    // Ambil tabel dari ID
    const table = document.getElementById("myTable");

    // Ambil data tabel secara manual, tapi abaikan kolom "Aksi"
    const rows = [];
    const headers = [];

    // Ambil header, kecuali kolom terakhir (Aksi)
    table.querySelectorAll("thead tr th").forEach((th, index) => {
        if (index < table.querySelectorAll("thead tr th").length - 1) { // Skip kolom terakhir
            headers.push(th.textContent.trim());
        }
    });

    // Ambil setiap baris data, kecuali kolom terakhir
    table.querySelectorAll("tbody tr").forEach((tr) => {
        const row = [];
        const cells = tr.querySelectorAll("td");
        cells.forEach((td, index) => {
            if (index < cells.length - 1) { // Skip kolom terakhir
                row.push(td.textContent.trim());
            }
        });
        rows.push(row);
    });

    // Gunakan autoTable untuk menambahkan tabel ke PDF
    doc.autoTable({
        head: [headers],
        body: rows,
        startY: 20, // Mulai di bawah judul
        styles: { fontSize: 10, cellPadding: 3 },
       headStyles: { fillColor: [0, 123, 255], textColor: [255, 255, 255] },
    });

    // Simpan PDF
    doc.save("data-mahasiswa.pdf");
});

//sapaan user
// Nama user (contoh: ambil dari session PHP atau database)
 // Ubah ini sesuai data session atau variabel PHP

// Fungsi untuk mendapatkan sapaan berdasarkan waktu
function getStyledGreeting(username) {
    const now = new Date();
    const hours = now.getHours();
    let greeting = "";

    if (hours >= 6 && hours < 9) {
        greeting = `🌅 Selamat pagi, ${username}!`;
    } else if (hours >= 9 && hours < 16) {
        greeting = `☀️ Selamat siang, ${username}!`;
    } else if (hours >= 16 && hours < 18) {
        greeting = `🌇 Selamat sore, ${username}!`;
    } else {
        greeting = `🌙 Selamat malam, ${username}!`;
    }

    return greeting;
}

// Tampilkan sapaan
document.getElementById("greeting").textContent = getStyledGreeting(username);


// Menampilkan sapaan di pojok kanan atas
function updateGreeting() {
    const greetingDiv = document.getElementById("greeting");
    const greetingText = `${getGreeting()}, ${userName}`;
    greetingDiv.textContent = greetingText;
}

// Panggil fungsi saat halaman dimuat
updateGreeting();

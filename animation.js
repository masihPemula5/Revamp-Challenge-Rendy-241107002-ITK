function openModal(id) {
    document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}




// hapus akun

// SweetAlert Confirmation for Delete Account
const deleteButton = document.getElementById('delete-account-btn');
if (deleteButton) {
    deleteButton.addEventListener('click', function () {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Akun Anda akan dihapus secara permanen!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'delete_account.php';
            }
        });
    });
}


//logika eye icon
document.getElementById("eye-icon").addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    const eyeIcon = document.getElementById("eye-icon");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.innerHTML = "🙉";
    } else {
        passwordField.type = "password";
        eyeIcon.innerHTML = "🙈";
    }
});

//sama tapi untuk register
document.getElementById("eye-icon-register").addEventListener("click", function () {
    const passwordField = document.getElementById("password-register");
    const eyeIcon = document.getElementById("eye-icon-register");


    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.innerHTML = "🙉";
    } else {
        passwordField.type = "password";
        eyeIcon.innerHTML = "🙈";
    }
});

function createSnowflakes() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.animationDuration = Math.random() * 6 + 9 + 's';
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    document.body.appendChild(snowflake);

    snowflake.addEventListener('animationend', () => {
        addToSnowPile(snowflake);
        snowflake.remove();
    });
}

setInterval(createSnowflakes, 200);



//drag n dropp form

function makeDraggable(elementId) {
    const element = document.getElementById(elementId);
    let isDragging = false;
    let offsetX, offsetY;

    element.addEventListener("mousedown", function (e) {
        isDragging = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
        element.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", function (e) {
        if (isDragging) {
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
        }
    });

    document.addEventListener("mouseup", function () {
        isDragging = false;
        element.style.cursor = "move";
    });
}

// Aktifkan drag-and-drop untuk kedua form
makeDraggable("form");
makeDraggable("formRegister");

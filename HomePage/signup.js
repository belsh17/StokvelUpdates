// const openModalButtons = document.querySelectorAll("[data-modal-target]")
// const closeModalButtons = document.querySelectorAll("[data-modal-close]")
// const overlay = document.getElementById("overlay")

// openModalButtons.forEach(button => {
//     button.addEventListener("click", () => {
//         const modal = document.querySelector(button.dataset.modalTarget)
//         openModal(modal)
//     })
// })

// closeModalButtons.forEach(button => {
//     button.addEventListener("click", () => {
//         const modal = button.closest(".modal")
//         closeModal(modal)
//     })
// })

// function openModal(modal){
//     if(modal == null) return
//     modal.classList.add("active")
//     overlay.classList.add("active")
// }

// function closeModal(modal){
//     if(modal == null) return
//     modal.classList.remove("active")
//     overlay.classList.remove("active")
// }

document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const password = document.getElementById('password').value;

    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, mobileNumber, password })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registration failed');
    });
});

//listens for when the submit button is pressed for function to run
document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();

    //gives these variables the values inputed by the user in the input block
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const password = document.getElementById('password').value;

    //converts to JSON
    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, mobileNumber, password })
    })
    .then(response => response.text())
    .then(data => {
        //data is the plain text received by the server
        //this displays a pop up alert when successful
        alert(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registration failed');
    });
});
// this listens for the button submit once the form is submitted the function is executed
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    //gives email + password the values entered by the user
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    //stringify converts the email and password to JSON string
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    //processes the response and converts to JSON format
    .then(response => response.json())
    .then(data => {
        //if data token exists = login was successfull
        if (data.token) {
            //saved to local storage
            localStorage.setItem('token', data.token);
            alert('Login successful');
        } else {
            alert('Login failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed');
    });
});
// Get elements from HTML
const paymentCartList = document.getElementById('payment-cart-list');
const paymentCartTotal = document.getElementById('payment-cart-total');
//testing delivery fee 
//const DELIVERY_FEE = 100.00; // Define a fixed delivery fee


// Function to display cart on payment page
function displayPaymentCart() {
    const cartData = localStorage.getItem('checkoutCart');
    if (cartData) {
        const shoppingCart = JSON.parse(cartData);
        paymentCartList.innerHTML = '';
        shoppingCart.forEach(item => {
            const cartItemHTML = `
                <li>
                    <span>${item.name} (x${item.quantity})</span>
                    <span>R${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </li>
            `;
            paymentCartList.insertAdjacentHTML('beforeend', cartItemHTML);
        });
        //testing out the delivery fee
        // // Calculate subtotal
        // const subtotal = shoppingCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        
        // // Calculate total including delivery fee
        // const total = subtotal + DELIVERY_FEE;

        // // Update the total display
        // paymentCartTotal.innerHTML = `
        //     <p>Subtotal: R${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        //     <p>Delivery Fee: R${DELIVERY_FEE.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        //     <p><strong>Total: R${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></p>
        // `;
        //end of test
        const total = shoppingCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        paymentCartTotal.textContent = `Total: R${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    }
}
//display cart on payment page load
displayPaymentCart();


// Handle payment form submission
document.getElementById('payment-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get payment information
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    // Validate payment information (placeholder for actual validation)
    if (validatePayment(cardNumber, expiryDate, cvv)) {
        // Process payment (this is a placeholder, replace with actual payment processing)
        console.log('Processing payment with:', cardNumber, expiryDate, cvv);

        // Clear the cart data after payment
        localStorage.removeItem('shoppingCart');

        // Optionally, show a success message before redirecting
        alert('Payment successful! Redirecting to confirmation page...');

        // Redirect to a confirmation page or show a success message
        window.location.href = 'confirmation.html'; // URL of your confirmation page
    } else {
        // Handle invalid payment information
        alert('Invalid payment details. Please check and try again.');
    }
});

// Example validation function
function validatePayment(cardNumber, expiryDate, cvv) {
    // Implement actual validation logic here
    // For demonstration purposes, we're just checking if fields are not empty
    return cardNumber.length === 16 && expiryDate.length === 5 && cvv.length === 3;
}


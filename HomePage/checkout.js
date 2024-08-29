//get elements from HTML
//giving variable checkoutCartList the values from html checkout
const checkoutCartList = document.getElementById('checkout-cart-list');
//giving checkoutCartTotal the values from html checkout
const checkoutCartTotal = document.getElementById('checkout-cart-total');

//function to display cart on checkout page 
function displayCheckoutCart() {
  //giving variable cart data the variables saved in local storage which was set in the stock javascript
  const cartData = localStorage.getItem('shoppingCart');
  //if cart exists do the following
  if(cartData) {
    //the variable cart data is converted to JSON
    const shoppingCart = JSON.parse(cartData);
    //html element that contains the cart items + innerHTML returns the HTML content + '' sets it to expty string
    checkoutCartList.innerHTML = '';
    //shoppingCart = array of objs., forEach is a method iterates over the array
    //executing a callback func. - takes single argument 'item'
    //this funct. is called for each item in the array
    shoppingCart.forEach(item => {
      // span is used to display info about each item in the cart
      const cartItemHTML = `
      <li>
            <span>${item.name} (x${item.quantity})</span>
            <span>R${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
      </li>
      `;
      //insertAdj = method inserts string of HTML content into the DOM 
      //takes 2 arguments: position and html
      checkoutCartList.insertAdjacentHTML('beforeend', cartItemHTML);
    });
    //acc is the accumulated value = 0 in this case.
    //calculates the total cost of all items in the shopping cart
    const total = shoppingCart.reduce((acc, item)=> acc + item.price * item.quantity, 0);
    checkoutCartTotal.textContent = `Total: R${total.toLocaleString('en-US',  { minimumFractionDigits: 2 })}`;

  }
}

//display cart on checkout page load
displayCheckoutCart();



// Handle payment form submission
document.getElementById('clear-cart').addEventListener('click', () => {
  // Store cart data for payment page
  const cartData = localStorage.getItem('shoppingCart');
  localStorage.setItem('checkoutCart', cartData);
  
  // Redirect to payment page
  window.location.href = 'payment.html'; // URL of your payment page
});

// Handle payment form submission
document.getElementById('back-stock').addEventListener('click', () => {

  // Redirect to payment page
  window.location.href = 'stock.html'; // URL of your payment page
});

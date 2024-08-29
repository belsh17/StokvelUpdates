// // Create a cart data structure
// let cart = {};
// // Get the cart contents element
// const cartContents = document.getElementById('cartContents');

// // Get the add to cart buttons
// const addToCartButtons = document.querySelectorAll('[data-product-id]');

// // Add event listeners to the add to cart buttons
// addToCartButtons.forEach((button) => {
//   button.addEventListener('click', (event) => {
//     const productId = event.target.dataset.productId;
//     const quantity = parseInt(event.target.dataset.quantity);

//     // Update the cart data structure
//     updateCart(productId, quantity);

//     // Render the cart page
//     renderCartPage();
//   });
// });

// // Function to update the cart data structure
// function updateCart(productId, quantity) {
//   if (!cart[productId]) {
//     cart[productId] = { quantity: 0, price: getPrice(productId) };
//   }
//   cart[productId].quantity += quantity;

//   // Update the quantity display in the DOM
//   const quantityElement = document.getElementById(`quantity-${productId}`);
//   if (quantityElement) {
//     quantityElement.textContent = cart[productId].quantity;
//   }
// }

// // Function to render the cart page
// function renderCartPage() {
//   cartContents.innerHTML = '';
//   Object.keys(cart).forEach((productId) => {
//     if (cart[productId].quantity > 0) { // Only render products with quantity > 0
//       const html = `
//         <div class="cart-item">
//           <h3>Lukas Burger</h3>
//           <p>Quantity: <span id="quantity-${productId}">${cart[productId].quantity}</span></p>
//           <p>Price: R${getPrice(productId)}</p>
//           <button class="remove-from-cart" data-product-id="${productId}">Remove</button>
//         </div>
//       `;
//       cartContents.innerHTML += html;
//     }
//   });
// }

// // Add event listeners to remove buttons after rendering
// const removeButtons = document.querySelectorAll('.remove-from-cart');
// removeButtons.forEach((button) => {
//   button.addEventListener('click', (event) => {
//     const productId = event.target.dataset.productId;
//     removeFromCart(productId);
//   });
// });

// // Calculate and display total (add this logic)
// displayTotal();

// // Function to remove an item from the cart
// function removeFromCart(productId) {
// if (cart[productId]) {
//   cart[productId].quantity -= 1;

//   // Update the quantity display in the DOM
//   const quantityElement = document.getElementById(`quantity-${productId}`);
//   if (quantityElement) {
//     quantityElement.textContent = cart[productId].quantity;
//   }

//   // Remove the item from the cart if quantity is zero
//   if (cart[productId].quantity === 0) {
//     delete cart[productId];
//     renderCartPage(); // Rerender the cart to reflect the removal
//   } else {
//     renderCartPage();
//   }
// }
// }

// // Function to get the price of a product (update to read from cart)
// function getPrice(productId) {
// // You'll need to define the prices for each product ID
// // (e.g., in your cart object or a separate data source)
// if (productId == "1") {
//   return 100; // Example - store price in the cart object
// } else if (productId == "2") {
//   return 200;
// } else if (productId == "3") {
//   return 300;
// } else if (productId == "4") {
//   return 400;
// } else if (productId == "5") {
//   return 500;
// } else if (productId == "6") {
//   return 400;
// } else if (productId == "7") {
//   return 300;
// } else if (productId == "8") {
//   return 200;
// } else if (productId == "9") {
//   return 100;
// } else {
//   return "no product selected";
// }
// }

// // Function to calculate and display the total
// function displayTotal() {
// let total = 0;
// for (const productId in cart) {
//   total += cart[productId].quantity * cart[productId].price;
// }
// // Update the total display in the DOM (assuming you have elements with IDs 'subtotal', 'delivery', 'total')
// document.getElementById('subtotal').textContent = `Subtotal: R${total}`;
// // Update delivery and total based on your logic
// }

//end of cart system

//testing soemthing 

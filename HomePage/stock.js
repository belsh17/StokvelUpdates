function fun(){
    document.getElementById("frame1").style.visibility = "visible";
    document.getElementById("frame1").classList.add("style");
}

function remove()
{
    document.getElementById("frame1").classList.remove("style");
    document.getElementById("frame1").style.visibility = "hidden";
}





//

//get the cart list element from html and assigns to variable cartList
const cartList = document.getElementById('cart-list');

// get the cart total element from html and assigns to variable cartTotal
const cartTotal = document.getElementById('cart-total');

//get the container containing all the products in it
const productsContainer = document.querySelector('.prod-container2');

// creating products array to link to the products in html
const products = [
    { id: 1, name: 'Boer Goat', price: 100.00, image: 'IMG_0542.jpeg', animalType: 'Lukas Burger' },
    { id: 2, name: 'Angora Goat', price: 200.00, image: 'IMG_0542.jpeg', animalType: 'Lukas Burger' },
    { id: 3, name: 'Alpine Goat', price: 300.00, image: 'IMG_0542.jpeg', animalType: 'Lukas Burger' },
    { id: 4, name: 'Jampnapari Goat', price: 400.00, image: 'IMG_0540.jpeg', animalType: 'Lukas Burger' },
    { id: 5, name: 'Donkey', price: 500.00, image: 'IMG_4937.jpeg', animalType: 'Lukas Burger' },
    { id: 6, name: 'Haystack', price: 400.00, image: 'feed.jpg', animalType: 'Lukas Burger' },
    { id: 7, name: 'Boer Goat', price: 300.00, image: 'IMG_0542.jpeg', animalType: 'Lukas Burger' },
    { id: 8, name: 'Peppa Pig', price: 200.00, image: 'c7e0b19c-a9b4-41cb-bf77-546840845d1f.jpeg', animalType: 'Lukas Burger' },
    { id: 9, name: 'Dwarf Goat', price: 100.00, image: 'MatGoats.jpeg', animalType: 'Lukas Burger' }
];


//create empty cart array
let shoppingCart = [];

//get cookie data cart youtube
// function checkCart(){
//    var cookieValue = document.cookie
//    .split('; ')
//    .find(row => row.startsWith('listCart='));
//    if(cookieValue){
//       listCart = JSON.parse(cookieValue.split('=')[1]);
//    }
// }
// checkCart();
//end of cookie check

// Load cart from localStorage
function loadCart() {
  const cartData = localStorage.getItem('shoppingCart');
  if (cartData) {
      shoppingCart = JSON.parse(cartData);
      updateCart(); // Update the cart display
  }
}
//Function to add a product to the cart
function addProductToCart(productId) {
    const product = products.find(product => product.id === parseInt(productId));
    // Check if the product is already in the cart
  if (product) {
    //check if product is already in cart
    const existingProduct = shoppingCart.find(item => item.id === product.id);
      if (existingProduct) {
        // Increment quantity if product is already in cart
        existingProduct.quantity++;
      } else {
    //add product to cart 
    shoppingCart.push({ ...product, quantity: 1});
    }
    updateCart();
} else {
    console.error(`Product with ID ${productId} not found`);
 }
   console.log("The product clicked is" , products);
}

// Function to update cart display
function updateCart() {
    cartList.innerHTML = '';

    // Loop through cart items and display them
    shoppingCart.forEach((item, index) => {
        
        const cartItemHTML = `
      <li>
        <span>${item.name} (x${item.quantity})</span>
        <span>R${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        <button class="remove-from-cart" data-index="${index}">Remove</button>
      </li>
    `;
        cartList.insertAdjacentHTML('beforeend', cartItemHTML);
     
    });

    // Update cart total
    const total = shoppingCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    // document.getElementById('cart-total').innerText = `Cart Total: R${cartTotal.toFixed(2)}`;
    cartTotal.textContent = `Total: R${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

// Update cart count in right corner
const cartCount = shoppingCart.reduce((acc, item) => acc + item.quantity, 0);
document.getElementById('cart-count').textContent = cartCount;

// Save cart to localStorage
localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

   // Attach event listener to "Remove from Cart" buttons
   document.querySelectorAll('.remove-from-cart').forEach(button => {
    button.addEventListener('click', event => {
    
      const index = event.target.dataset.index;
      shoppingCart.splice(index, 1);
      updateCart(); // Update cart display after removing item
    });
  });
}
  

  products.forEach(product => {
    const productHTML = `
    <div class="pro">
      <img src="images/${product.image}" alt="IMAGE NOT AVAILABLE" />
      <div class="des">
        <span>${product.animalType}</span>
        <h5>${product.name}</h5>
        <h4>R${product.price}</h4>
      </div>
      <button class="add-to-cart" data-product-id="${product.id}">Add to cart</button>
      <a href="cart.html"><i class="fa-solid fa-trailer fa-bounce trailer"></i></a>
    </div>
  `;
  //commenting this line out to test but this worked
  // document.querySelector('.prod-container').innerHTML += productHTML;
  productsContainer.insertAdjacentHTML('beforeend', productHTML);

});

// Attach event listener to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = e.target.dataset.productId;
      addProductToCart(productId);
    });
}); 

//Load cart when page loads 
loadCart();


// Get the checkout button this redirects to checkout page
const checkoutBtn = document.getElementById('checkout');

// Add an event listener to the checkout button
checkoutBtn.addEventListener('click', () => {
  // Redirect to the checkout page
  window.location.href = 'checkout.html';
});





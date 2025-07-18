const products = [
  { id: 1, name: "Dell Inspiron 15", brand: "Dell", price: 749, image: "images/laptop1.jpg" },
  { id: 2, name: "HP Envy x360", brand: "HP", price: 849, image: "images/laptop2.jpg" },
  { id: 3, name: "Lenovo Yoga Slim", brand: "Lenovo", price: 899, image: "images/laptop3.jpg" },
  { id: 4, name: "Asus VivoBook 14", brand: "Asus", price: 679, image: "images/laptop4.jpg" },
  { id: 5, name: "Apple MacBook Air", brand: "Apple", price: 1099, image: "images/laptop5.jpg" },
  { id: 6, name: "Acer Aspire 7", brand: "Acer", price: 629, image: "images/laptop6.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  document.getElementById("cart-count").textContent = `Cart (${cart.length})`;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function addToCart(product, button) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast("Item added to cart");

  // Animate button
  button.classList.add("animate__animated", "animate__tada");
  setTimeout(() => button.classList.remove("animate__animated", "animate__tada"), 1000);
}

function renderProducts(filter = "all") {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  const filtered = filter === "all" ? products : products.filter(p => p.brand === filter);

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card animate__animated animate__fadeInUp";

    const name = product.name || "Unknown";
    const price = product.price || "N/A";
    const image = product.image || "https://via.placeholder.com/300x200?text=No+Image";

    card.innerHTML = `
      <img src="${image}" alt="${name}" />
      <h3><a href="product.html?id=${product.id}" style="text-decoration:none; color:inherit;">${name}</a></h3>
      <p>$${price}</p>
      <button><i class="fas fa-cart-plus"></i> Add to Cart</button>
    `;

    const button = card.querySelector("button");
    button.addEventListener("click", () => addToCart(product, button));

    grid.appendChild(card);
  });
}

document.getElementById("brand").addEventListener("change", (e) => {
  renderProducts(e.target.value);
});

document.getElementById("mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

document.getElementById("cart-count").addEventListener("click", () => {
  showCart();
});

function showCart() {
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item, i) => {
      const div = document.createElement("div");
      div.innerHTML = `${item.name} - $${item.price} 
        <button onclick="removeItem(${i})">Remove</button>`;
      cartItemsDiv.appendChild(div);
      total += item.price;
    });
  }

  document.getElementById("total-price").textContent = `Total: $${total}`;
  cartSidebar.classList.add("open");
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showCart();
}

function closeCart() {
  document.getElementById("cart-sidebar").classList.remove("open");
}

function checkout() {
  closeCart();
  document.getElementById("payment-modal").classList.remove("hidden");
}

function makePayment() {
  alert("Payment Successful! Thank you for your order.");
  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();
  closePayment();
  return false;
}

function closePayment() {
  document.getElementById("payment-modal").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderProducts();
});

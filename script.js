const products = [
  { name: "Studio Fix Fluid", price: 1399, image: "Studio Fix Fluid.png" },
  { name: "Filter Finish Primer", price: 699, image: "Filter Finish.png" },
  { name: "Luminous Glow Powder", price: 1139, image: "Luminous Glow Powder.png" },
  { name: "Lash Paradise Mascara", price: 879, image: "Lash Paradise.png" },
  { name: "Soft Rose Luxe Blush", price: 1180, image: "Soft Rose Luxe Blush.png" },
  { name: "Sculpt & Define Contour", price: 1499, image: "Sculpt & Define Contour.png" },
  { name: "Radiance Serum", price: 1899, image: "Radiance Serum.png" },
  { name: "Gentle Cleanser", price: 990, image: "Gentle Cleanser.png" },
  { name: "Protect & Glow Sunscreen", price: 1299, image: "Protect & Glow Sunscreen.png" },
  { name: "Velvet Flush Liquid Blush", price: 1045, image: "Velvet Flush Liquid Blush.png" }
];

let cart = [];
let voucherApplied = false;

function showPage(page) {
  ["homePage", "productsPage", "cartPage"].forEach((id) => {
    document.getElementById(id)?.classList.remove("active");
  });
  document.getElementById(page)?.classList.add("active");
}

function productCard(product, index, withButton = true) {
  const button = withButton
    ? `<button class="add" type="button" onclick="addToCart(${index})">🛍 ADD TO CART</button>`
    : "";

  return `<article class="product"><img src="${product.image}" alt="${product.name}"><h3>${product.name}</h3><p class="price">₱${product.price}</p>${button}</article>`;
}

function renderProducts() {
  const productGrid = document.getElementById("productGrid");
  const homeCollection = document.getElementById("homeCollection");

  if (productGrid) {
    productGrid.innerHTML = products.map((product, index) => productCard(product, index)).join("");
  }

  if (homeCollection) {
    homeCollection.innerHTML = products.slice(0, 4).map((product, index) => productCard(product, index)).join("");
  }
}

function addToCart(index) {
  cart.push(products[index]);
  alert("Added to cart!");
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    updateTotal();
    return;
  }

  cartItems.innerHTML = cart.map((product, index) => `
    <div class="cart-item">
      <div class="cart-product"><img src="${product.image}" alt="${product.name}"><span>${product.name}</span></div>
      <span>₱${product.price}</span>
      <button class="add" onclick="removeItem(${index})">REMOVE</button>
      <strong>₱${product.price}</strong>
    </div>
  `).join("");
  updateTotal();
}

function updateTotal() {
  const subtotal = cart.reduce((total, product) => total + product.price, 0);
  const discount = voucherApplied ? Math.round(subtotal * 0.15) : 0;
  document.getElementById("subtotal").textContent = "₱" + subtotal;
  document.getElementById("discount").textContent = "₱" + discount;
  document.getElementById("total").textContent = "₱" + (subtotal - discount);
  document.getElementById("saved").textContent = "SAVED ₱" + discount;
}

document.getElementById("applyVoucher").onclick = () => {
  voucherApplied = document.getElementById("voucher").value.trim().toUpperCase() == "ICT302";
  updateTotal();
  alert(voucherApplied ? "15% discount applied!" : "Invalid voucher code.");
};

document.getElementById("checkout").onclick = () => {
  if (!cart.length) return alert("Your cart is empty!");
  alert("Thank you for shopping with Beauty & Co.!");
  cart = [];
  voucherApplied = false;
  updateCart();
};

renderProducts();
updateCart();
showPage("homePage");
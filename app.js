let products = [];
let cart = [];

fetch('products.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    renderProducts(products);
  })
  .catch(error => console.error('Error loading products:', error));

function renderProducts(productList) {
  const container = document.getElementById('productList');
  container.innerHTML = '';
  productList.forEach(product => {
    const item = document.createElement('div');
    item.className = 'product';
    item.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price} / ${product.unit}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(item);
  });
}

function filterProducts() {
  const query = document.getElementById('searchBox').value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    alert(`${product.name} added to cart.`);
  }
}

function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty.');
    return;
  }
  let summary = 'Cart Summary:\n';
  let total = 0;
  cart.forEach(item => {
    summary += `- ${item.name} (₹${item.price})\n`;
    total += item.price;
  });
  summary += `\nTotal: ₹${total}`;
  alert(summary);
  cart = [];
}
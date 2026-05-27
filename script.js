const PRODUCT = {
  name: 'BrewGo Kaffemaskine 3-i-1',
  price: 499,
  id: 'brewgo-v1',
};

let cart = [];

function addToCart() {
  const existing = cart.find(i => i.id === PRODUCT.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...PRODUCT, qty: 1 });
  }
  updateCart();
  showToast();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCart();
}

function updateCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  document.getElementById('cartCount').textContent = count;

  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  const totalEl = document.getElementById('cartTotal');

  if (cart.length === 0) {
    body.innerHTML = '<p class="cart-empty">Din kurv er tom.</p>';
    footer.style.display = 'none';
    return;
  }

  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <strong>${item.name}</strong>
        <span>${item.price} kr. / stk.</span>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty('${item.id}', -1)">−</button>
        <span>${item.qty}</span>
        <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
      </div>
    </div>
  `).join('');

  totalEl.textContent = total + ' kr.';
  footer.style.display = 'block';
}

function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function showToast() {
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

function checkout() {
  alert('Tak for din ordre! 🎉\n\nDette er en demo – betalingsintegration kan tilføjes via Stripe eller MobilePay.');
}

document.getElementById('cartBtn').addEventListener('click', openCart);

// Graceful image fallback
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.background = 'linear-gradient(145deg,#1c1c1c,#111)';
    img.style.borderRadius = '16px';
    img.removeAttribute('src');
  });
});

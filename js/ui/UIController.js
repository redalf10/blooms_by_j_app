export class UIController {
  constructor(shopService, reviewService) {
    this.shopService = shopService;
    this.reviewService = reviewService;
    this.elements = {
      productGrid: document.getElementById('productGrid'),
      cartCount: document.getElementById('cartCount'),
      cartItems: document.getElementById('cartItems'),
      cartFooter: document.getElementById('cartFooter'),
      cartPanel: document.getElementById('cartPanel'),
      cartOverlay: document.getElementById('cartOverlay'),
      mainNav: document.getElementById('mainNav'),
      toast: document.getElementById('toast'),
      cursor: document.getElementById('cursor'),
      cursorRing: document.getElementById('cursorRing'),
      heroPetals: document.getElementById('heroPetals'),
      reviewForm: document.getElementById('reviewForm'),
      starsInput: document.getElementById('starsInput'),
      ratingValue: document.getElementById('ratingValue'),
      reviewsFeed: document.getElementById('reviewsFeed')
    };

    this.init();
  }

  async init() {
    this.shopService.subscribe(() => this.render());
    this.setupEventListeners();
    await this.render();
    this.initVisuals();
  }

  setupEventListeners() {
    // Scroll event
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter') || 'all';
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.shopService.setFilter(filter);
      });
    });

    // Cursor movement
    document.addEventListener('mousemove', e => this.moveCursor(e));

    // Delegation for product actions
    this.elements.productGrid.addEventListener('click', e => {
      const addBtn = e.target.closest('.add-cart-btn');
      if (addBtn) {
        const productData = JSON.parse(addBtn.getAttribute('data-product'));
        this.shopService.addToCart(productData);
        this.showToast(`🌸 ${productData.name} added to cart!`);
      }

      const wishlistBtn = e.target.closest('.wishlist-btn');
      if (wishlistBtn) {
        wishlistBtn.textContent = wishlistBtn.textContent === '♡' ? '♥' : '♡';
        wishlistBtn.style.color = wishlistBtn.textContent === '♥' ? 'var(--rose)' : '';
      }
    });

    // Cart events (delegation)
    this.elements.cartItems.addEventListener('click', e => {
      const removeBtn = e.target.closest('.remove-item');
      if (removeBtn) {
        const id = parseInt(removeBtn.getAttribute('data-id'));
        this.shopService.removeFromCart(id);
      }

      const qtyBtn = e.target.closest('.qty-btn');
      if (qtyBtn) {
        const id = parseInt(qtyBtn.getAttribute('data-id'));
        const delta = parseInt(qtyBtn.getAttribute('data-delta'));
        this.shopService.updateCartQuantity(id, delta);
      }
    });

    // Occasion cards
    document.querySelectorAll('.occasion-card').forEach(card => {
      card.addEventListener('click', () => {
        const occasion = card.getAttribute('data-occasion');
        this.showToast(`🌸 Browsing ${occasion} flowers...`);
        document.getElementById('collections').scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Inquiry button
    document.getElementById('inquiryBtn')?.addEventListener('click', () => {
      this.showToast("✉️ Inquiry sent! We'll reply within 2 hours.");
    });

    // Star Rating
    this.elements.starsInput?.addEventListener('click', e => {
      const star = e.target.closest('.star');
      if (star) {
        const val = parseInt(star.getAttribute('data-value'));
        this.elements.ratingValue.value = val;
        // Update UI
        document.querySelectorAll('.star').forEach((s, i) => {
          s.textContent = i < val ? '★' : '☆';
          s.classList.toggle('active', i < val);
        });
      }
    });

    // Review Form Submission
    this.elements.reviewForm?.addEventListener('submit', async e => {
      e.preventDefault();
      const reviewData = {
        name: document.getElementById('reviewName').value,
        email: document.getElementById('reviewEmail').value,
        rating: parseInt(this.elements.ratingValue.value),
        comment: document.getElementById('reviewComment').value
      };

      try {
        await this.reviewService.submitReview(reviewData);
        this.showToast('🌸 Thank you for your review!');
        this.elements.reviewForm.reset();
        // Reset stars
        document.querySelectorAll('.star').forEach(s => {
          s.textContent = '☆';
          s.classList.remove('active');
        });
        this.elements.ratingValue.value = 0;
        await this.renderReviews();
      } catch (err) {
        this.showToast('⚠️ ' + err.message);
      }
    });

    // Global click for cart toggle
    window.toggleCart = () => this.toggleCart();
  }

  async render() {
    await this.renderProducts();
    this.renderCart();
    await this.renderReviews();
  }

  async renderProducts() {
    const products = await this.shopService.getProducts();
    this.elements.productGrid.innerHTML = products.map((p, i) => `
      <div class="product-card reveal" style="animation-delay:${i * 0.07}s">
        <div class="product-img-wrap">
          <div class="product-img">${p.icon}</div>
          ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
          <div class="product-actions">
            <button class="add-cart-btn" data-product='${JSON.stringify(p)}'>Add to Cart</button>
            <button class="wishlist-btn">♡</button>
          </div>
        </div>
        <div class="product-info">
          <div class="stars">${'★'.repeat(p.rating)}${'☆'.repeat(5 - p.rating)}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-variety">${p.variety}</div>
          <div class="product-price">
            ${p.formattedPrice}
            ${p.oldPrice ? `<span class="old">${p.formattedOldPrice}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    this.handleScroll(); // Trigger reveal
  }

  renderCart() {
    const { cart } = this.shopService;
    this.elements.cartCount.textContent = cart.totalCount;

    if (cart.isEmpty) {
      this.elements.cartItems.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">💐</div>
          <p>Your cart is empty</p>
          <p style="font-size:0.8rem;color:var(--text-soft)">Add some beautiful blooms!</p>
        </div>`;
      this.elements.cartFooter.innerHTML = '';
      return;
    }

    this.elements.cartItems.innerHTML = cart.items.map(item => `
      <div class="cart-item">
        <div class="cart-item-img">${item.product.icon || '🌸'}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.product.name}</div>
          <div class="cart-item-price">₱${item.total.toLocaleString()}</div>
          <div class="qty-control">
            <button class="qty-btn" data-id="${item.product.id}" data-delta="-1">−</button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn" data-id="${item.product.id}" data-delta="1">+</button>
          </div>
        </div>
        <button class="remove-item" data-id="${item.product.id}">✕</button>
      </div>
    `).join('');

    this.elements.cartFooter.innerHTML = `
      <div class="cart-total">
        <span>Total</span>
        <span>₱${cart.totalPrice.toLocaleString()}</span>
      </div>
      <button class="submit-btn" id="checkoutBtn" style="margin-top:0">Proceed to Checkout</button>
    `;

    document.getElementById('checkoutBtn')?.addEventListener('click', () => {
      this.showToast('💌 Redirecting to checkout...');
      setTimeout(() => this.toggleCart(), 800);
    });
  }

  async renderReviews() {
    if (!this.elements.reviewsFeed) return;
    const reviews = await this.reviewService.getReviews();
    
    // Reverse to show latest first
    const sorted = [...reviews].reverse();

    this.elements.reviewsFeed.innerHTML = sorted.map((r, i) => `
      <div class="testi-card reveal visible" style="animation-delay:${i * 0.1}s">
        <div class="testi-quote">"</div>
        <p class="testi-text">${r.comment}</p>
        <div class="testi-author">
          <div class="testi-avatar">${r.name.substring(0, 2).toUpperCase()}</div>
          <div>
            <div class="testi-name">${r.name}</div>
            <div class="testi-loc">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  toggleCart() {
    this.elements.cartPanel.classList.toggle('open');
    this.elements.cartOverlay.classList.toggle('open');
    document.body.style.overflow = this.elements.cartPanel.classList.contains('open') ? 'hidden' : '';
  }

  handleScroll() {
    this.elements.mainNav.classList.toggle('scrolled', window.scrollY > 40);
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add('visible');
      }
    });
  }

  showToast(msg) {
    this.elements.toast.textContent = msg;
    this.elements.toast.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.elements.toast.classList.remove('show'), 2800);
  }

  moveCursor(e) {
    const { cursor, cursorRing } = this.elements;
    cursor.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
    
    // Smooth ring follow
    if (!this.ringPos) this.ringPos = { x: 0, y: 0 };
    this.targetPos = { x: e.clientX - 18, y: e.clientY - 18 };
    
    if (!this.cursorAnimActive) {
      this.cursorAnimActive = true;
      const anim = () => {
        this.ringPos.x += (this.targetPos.x - this.ringPos.x) * 0.15;
        this.ringPos.y += (this.targetPos.y - this.ringPos.y) * 0.15;
        cursorRing.style.transform = `translate(${this.ringPos.x}px, ${this.ringPos.y}px)`;
        requestAnimationFrame(anim);
      };
      anim();
    }
  }

  initVisuals() {
    // Petals
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'petal';
      p.style.left = Math.random() * 100 + '%';
      p.style.width = (8 + Math.random() * 10) + 'px';
      p.style.height = (12 + Math.random() * 12) + 'px';
      p.style.animationDuration = (6 + Math.random() * 8) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      const hue = Math.random() > 0.5 ? 'var(--rose-light)' : 'var(--rose-pale)';
      p.style.background = hue;
      p.style.transform = `rotate(${Math.random() * 180}deg)`;
      this.elements.heroPetals.appendChild(p);
    }

    // Hover effects for ring
    document.addEventListener('mouseover', e => {
      if (e.target.closest('button, a, .product-card, .occasion-card')) {
        this.elements.cursorRing.style.width = '52px';
        this.elements.cursorRing.style.height = '52px';
        this.elements.cursorRing.style.opacity = '1';
      }
    });

    document.addEventListener('mouseout', e => {
      if (e.target.closest('button, a, .product-card, .occasion-card')) {
        this.elements.cursorRing.style.width = '36px';
        this.elements.cursorRing.style.height = '36px';
        this.elements.cursorRing.style.opacity = '0.6';
      }
    });
  }
}

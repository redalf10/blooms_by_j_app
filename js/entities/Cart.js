export class CartItem {
  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
  }

  get total() {
    return this.product.price * this.quantity;
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 0) this.quantity--;
  }
}

export class Cart {
  constructor() {
    this.items = [];
  }

  addItem(product) {
    const existing = this.items.find(item => item.product.id === product.id);
    if (existing) {
      existing.increment();
    } else {
      this.items.push(new CartItem(product));
    }
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.product.id !== productId);
  }

  updateQuantity(productId, delta) {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity += delta;
      if (item.quantity < 1) {
        this.removeItem(productId);
      }
    }
  }

  get totalCount() {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  get totalPrice() {
    return this.items.reduce((acc, item) => acc + item.total, 0);
  }

  get isEmpty() {
    return this.items.length === 0;
  }
}

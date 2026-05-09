import { Cart } from '../entities/Cart.js';

export class ShopService {
  constructor(productRepository) {
    this.productRepository = productRepository;
    this.cart = new Cart();
    this.activeFilter = 'all';
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  notify() {
    this.subscribers.forEach(callback => callback());
  }

  async getProducts() {
    return await this.productRepository.getProductsByCategory(this.activeFilter);
  }

  setFilter(filter) {
    this.activeFilter = filter;
    this.notify();
  }

  addToCart(product) {
    this.cart.addItem(product);
    this.notify();
  }

  removeFromCart(productId) {
    this.cart.removeItem(productId);
    this.notify();
  }

  updateCartQuantity(productId, delta) {
    this.cart.updateQuantity(productId, delta);
    this.notify();
  }

  checkout() {
    // Logic for checkout
    return true;
  }
}

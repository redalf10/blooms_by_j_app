import { Product } from '../entities/Product.js';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Garden Romance', variety: 'Mixed Seasonal Blooms', price: 850, icon: '💐', badge: 'New', category: 'bouquet', rating: 5 },
  { id: 2, name: 'Blush Peonies', variety: 'Premium Peony Bouquet', price: 1200, icon: '🌸', badge: 'Bestseller', category: 'bouquet', rating: 5, oldPrice: 1500 },
  { id: 3, name: 'Sunlit Happiness', variety: 'Sunflower & Chamomile', price: 650, icon: '🌻', badge: null, category: 'bouquet', rating: 4 },
  { id: 4, name: 'Midnight Orchid', variety: 'Purple Orchid Arrangement', price: 1800, icon: '💜', badge: 'Luxe', category: 'arrangement', rating: 5 },
  { id: 5, name: 'Rustic Dreams', variety: 'Dried Lavender & Wheat', price: 780, icon: '🌾', badge: null, category: 'dried', rating: 4 },
  { id: 6, name: 'Cherry Blossom', variety: 'Seasonal Spring Bouquet', price: 950, icon: '🌺', badge: 'Seasonal', category: 'seasonal', rating: 5 },
  { id: 7, name: 'Eternal Rose Box', variety: 'Preserved Roses · 12 Stems', price: 2800, icon: '🌹', badge: 'Popular', category: 'arrangement', rating: 5, oldPrice: 3200 },
  { id: 8, name: 'Wildflower Whimsy', variety: 'Mixed Wildflowers', price: 550, icon: '🌼', badge: null, category: 'bouquet', rating: 4 },
];

export class ProductRepository {
  async getAllProducts() {
    return MOCK_PRODUCTS.map(p => new Product(p));
  }

  async getProductsByCategory(category) {
    const products = await this.getAllProducts();
    if (category === 'all') return products;
    return products.filter(p => p.category === category);
  }
}

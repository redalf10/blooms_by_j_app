import { ProductRepository } from './infrastructure/ProductRepository.js';
import { ReviewRepository } from './infrastructure/ReviewRepository.js';
import { ShopService } from './application/ShopService.js';
import { ReviewService } from './application/ReviewService.js';
import { UIController } from './ui/UIController.js';

document.addEventListener('DOMContentLoaded', () => {
  const productRepo = new ProductRepository();
  const reviewRepo = new ReviewRepository();
  const shopService = new ShopService(productRepo);
  const reviewService = new ReviewService(reviewRepo);
  const uiController = new UIController(shopService, reviewService);

  console.log('🌸 Bloom by J — App Initialized with Clean Architecture');
});

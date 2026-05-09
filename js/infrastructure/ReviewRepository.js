import { Review } from '../entities/Review.js';

export class ReviewRepository {
  constructor() {
    this.storageKey = 'bloom_by_j_reviews';
  }

  async saveReview(review) {
    const reviews = await this.getAllReviews();
    reviews.push(review);
    localStorage.setItem(this.storageKey, JSON.stringify(reviews));
    return true;
  }

  async getAllReviews() {
    const data = localStorage.getItem(this.storageKey);
    const reviews = data ? JSON.parse(data) : [];
    // If no reviews, add some default ones to make it look "populated"
    if (reviews.length === 0) {
      const defaults = [
        { name: "Maria A.", rating: 5, comment: "Absolutely magical arrangements! J is an artist.", date: new Date().toISOString() },
        { name: "Rica C.", rating: 4, comment: "Fresh and beautiful, though delivery was slightly delayed. Still the best!", date: new Date().toISOString() }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(defaults));
      return defaults.map(r => new Review(r));
    }
    return reviews.map(r => new Review(r));
  }
}

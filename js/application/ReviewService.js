export class ReviewService {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  async submitReview(reviewData) {
    // Validation logic could go here
    if (!reviewData.name || !reviewData.rating || !reviewData.comment) {
      throw new Error('Please fill in all required fields.');
    }
    return await this.reviewRepository.saveReview(reviewData);
  }

  async getReviews() {
    return await this.reviewRepository.getAllReviews();
  }
}

import { Review } from '../entities/Review.js';
import { db } from './FirebaseConfig.js';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export class ReviewRepository {
  constructor() {
    this.reviewsCollection = collection(db, 'reviews');
  }

  async saveReview(review) {
    try {
      const docRef = await addDoc(this.reviewsCollection, {
        name: review.name,
        email: review.email,
        rating: review.rating,
        comment: review.comment,
        date: review.date.toISOString ? review.date.toISOString() : new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding review: ", error);
      throw new Error("Failed to save review to cloud database.");
    }
  }

  async getAllReviews() {
    try {
      const q = query(this.reviewsCollection, orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      const reviews = [];
      
      snapshot.forEach(doc => {
        const data = doc.data();
        reviews.push(new Review({ ...data, id: doc.id }));
      });

      if (reviews.length === 0) {
        return [
          new Review({ name: "Bloom by J", rating: 5, comment: "Welcome! Be the first to leave a review! 🌸", date: new Date().toISOString() })
        ];
      }

      return reviews;
    } catch (error) {
      console.error("Error getting reviews: ", error);
      return [];
    }
  }
}

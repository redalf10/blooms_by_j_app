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
    this.imgbbKey = "3da307374b3d3126742617f6990428bc"; // Your ImgBB API Key
  }

  async uploadToImgBB(file) {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${this.imgbbKey}`, {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("Image upload failed.");
    }
  }

  async saveReview(review, imageFile = null) {
    try {
      let imageUrl = null;

      if (imageFile) {
        imageUrl = await this.uploadToImgBB(imageFile);
      }

      const docRef = await addDoc(this.reviewsCollection, {
        name: review.name,
        email: review.email,
        rating: review.rating,
        comment: review.comment,
        imageUrl: imageUrl,
        date: review.date.toISOString ? review.date.toISOString() : new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding review: ", error);
      throw new Error("Failed to save review. Please try again.");
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

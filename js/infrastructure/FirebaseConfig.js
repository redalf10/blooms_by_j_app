// Firebase Modular SDK imports from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa_KUYuSGBYc63jH_MWr6bKPf68QnoLPA",
  authDomain: "project-by-j.firebaseapp.com",
  projectId: "project-by-j",
  storageBucket: "project-by-j.firebasestorage.app",
  messagingSenderId: "1058219518157",
  appId: "1:1058219518157:web:52a0e6f6c245428cbc2184"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

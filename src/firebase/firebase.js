import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA19vAOH2l1oBcC3_o4CXAX0y1454umvgo",
  authDomain: "islamic-movies-71784.firebaseapp.com",
  projectId: "islamic-movies-71784",
  storageBucket: "islamic-movies-71784.appspot.com",
  messagingSenderId: "203721857048",
  appId: "1:203721857048:web:8a3bc9e71ea0b4707dcb6d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "Users");
export default app;

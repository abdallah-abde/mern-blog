// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-640a7.firebaseapp.com",
  projectId: "mern-blog-640a7",
  storageBucket: "mern-blog-640a7.appspot.com",
  messagingSenderId: "319466409656",
  appId: "1:319466409656:web:244a1660b962c22ac66e4d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

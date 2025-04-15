// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyB4721XA1JwdWwy77hlTZowVod9pQdBQc4",
  authDomain: "penguflix-c847a.firebaseapp.com",
  projectId: "penguflix-c847a",
  storageBucket: "penguflix-c847a.firebasestorage.app",
  messagingSenderId: "505000260562",
  appId: "1:505000260562:web:2db778e6a00454aa698e0b",
  measurementId: "G-WJKGNKMYZ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export authentication
export const auth = getAuth(app);
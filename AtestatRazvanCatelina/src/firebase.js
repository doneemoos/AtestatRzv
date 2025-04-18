import { initializeApp } from "firebase/app";
import { getAuth }       from "firebase/auth";
import { getFirestore }  from "firebase/firestore";
import { getAnalytics }  from "firebase/analytics"; // opţional

/* configurarea ta */
const firebaseConfig = {
  apiKey:            "AIzaSyB4721XA1JwdWwy77hlTZowVod9pQdBQc4",
  authDomain:        "penguflix-c847a.firebaseapp.com",
  projectId:         "penguflix-c847a",
  storageBucket:     "penguflix-c847a.appspot.com",   // <- corectat .app**spot**.com
  messagingSenderId: "505000260562",
  appId:             "1:505000260562:web:2db778e6a00454aa698e0b",
  measurementId:     "G-WJKGNKMYZ4",
};

const app = initializeApp(firebaseConfig);

/* exporturi pe care le vom folosi */
export const auth = getAuth(app);
export const db   = getFirestore(app);
export const analytics = getAnalytics(app); // dacă vrei Analytics
export default app;

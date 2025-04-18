import { db } from "../firebase";
import {
  doc, setDoc, deleteDoc, onSnapshot, collection,
} from "firebase/firestore";

/* adaugă filmul în favorites / likes */
export const addToList = (uid, listName, movie) =>
  setDoc(doc(db, "users", uid, listName, movie.id), movie);

/* şterge filmul din listă */
export const removeFromList = (uid, listName, movieId) =>
  deleteDoc(doc(db, "users", uid, listName, movieId));

/* subscribe în timp‑real la o listă */
export const subscribeToList = (uid, listName, cb) => {
  const ref = collection(db, "users", uid, listName);
  return onSnapshot(ref, snap => cb(snap.docs.map(d => d.data())));
};

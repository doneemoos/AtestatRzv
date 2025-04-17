import { db } from '../firebase';
import { doc, setDoc, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const favoritesCollection = 'favorites';

// Function to add a movie ID to the user's favorites
export const addFavorite = async (userId, movieId) => {
  try {
    const userDoc = doc(db, favoritesCollection, userId);
    await setDoc(userDoc, {
      favorites: arrayUnion(movieId)
    }, { merge: true });
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
};

// Function to retrieve the user's favorite movie IDs
export const getFavorites = async (userId) => {
  try {
    const userDoc = doc(db, favoritesCollection, userId);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      return docSnap.data().favorites || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error retrieving favorites:", error);
    return [];
  }
};

// Function to remove a movie ID from the user's favorites
export const removeFavorite = async (userId, movieId) => {
  try {
    const userDoc = doc(db, favoritesCollection, userId);
    await setDoc(userDoc, {
      favorites: arrayRemove(movieId)
    }, { merge: true });
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
};
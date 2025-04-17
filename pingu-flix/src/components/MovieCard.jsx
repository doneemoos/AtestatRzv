import React from "react";
import { useState } from "react";
import { db } from "../firebase"; // Assuming you have Firestore initialized in firebase.js
import { doc, setDoc, deleteDoc } from "firebase/firestore";

const MovieCard = ({ movie, user }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = async () => {
    const movieRef = doc(db, "favorites", user.uid);

    if (isFavorite) {
      // Remove from favorites
      await deleteDoc(doc(movieRef, movie.id));
      setIsFavorite(false);
    } else {
      // Add to favorites
      await setDoc(doc(movieRef, movie.id), {
        title: movie.title,
        id: movie.id,
      });
      setIsFavorite(true);
    }
  };

  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
      <button onClick={handleFavoriteToggle}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default MovieCard;
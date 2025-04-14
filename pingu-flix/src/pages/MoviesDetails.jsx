// src/pages/MovieDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import movies from "../data/movies";

function MovieDetails() {
  // Preia movieId din URL
  const { movieId } = useParams();

  // Caută filmul după id (convertim movieId la număr)
  const movie = movies.find((m) => m.id === parseInt(movieId, 10));

  // Dacă nu găsește filmul, afișează un mesaj
  if (!movie) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center text-red-600">
        <h2>Filmul nu a fost găsit!</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>
      {movie.posterUrl && (
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full max-w-md rounded shadow mb-4"
        />
      )}
      <p className="mb-2">
        <strong>Descriere:</strong> {movie.description}
      </p>
      <p className="mb-2">
        <strong>Categorie:</strong> {movie.category}
      </p>
      <p className="mb-2">
        <strong>An:</strong> {movie.year}
      </p>
    </div>
  );
}

export default MovieDetails;

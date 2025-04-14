// src/pages/MovieDetails.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import movies from "../data/movies";

function MovieDetails() {
  const { movieId } = useParams();
  // Căutăm filmul comparând id-ul direct (deoarece id-urile sunt string-uri, ex: "ThePenguinAdventure")
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center text-red-600">
        <h2>Filmul nu a fost găsit!</h2>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Fundal blur din poster */}
      <div
        className="absolute top-0 left-0 w-full h-96 bg-cover bg-center blur-sm brightness-50"
        style={{ backgroundImage: `url(${movie.posterUrl})` }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row p-6">
          {/* Poster */}
          <div className="w-full md:w-1/4">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="rounded-lg shadow w-full object-cover"
            />
          </div>

          {/* Detalii */}
          <div className="md:ml-8 mt-6 md:mt-0 flex-1">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg mb-4">
              ▶ Watch now
            </button>

            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>

            <div className="flex items-center gap-2 mb-2">
              <button className="bg-black text-white text-xs px-2 py-1 rounded">
                Trailer
              </button>
              <button className="bg-black text-white text-xs px-2 py-1 rounded">
                HD
              </button>
              <span className="text-yellow-600 font-medium">
                IMDB: {movie.imdb || "N/A"}
              </span>
            </div>

            <p className="text-gray-700 mb-4">{movie.description}</p>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Released:</strong> {movie.year}
              </p>
              <p>
                <strong>Genre:</strong> {movie.category}
              </p>
              <p>
                <strong>Duration:</strong> {movie.duration || "N/A"} min
              </p>
              <p>
                <strong>Country:</strong> {movie.country || "N/A"}
              </p>
              <p>
                <strong>Production:</strong> {movie.production || "N/A"}
              </p>
              <p>
                <strong>Casts:</strong> {movie.cast || "N/A"}
              </p>
            </div>

            {/* Butoane Like/Dislike/Favorite */}
            <div className="flex items-center gap-4 mt-6">
              <button className="bg-blue-600 text-white px-4 py-1 rounded">
                👍 Like
              </button>
              <button className="bg-gray-300 text-gray-800 px-4 py-1 rounded">
                👎 Dislike
              </button>
              <button className="bg-gray-100 border px-4 py-1 rounded text-gray-800 hover:bg-gray-200">
                ➕ Add to favorite
              </button>
            </div>

            {/* Link spre video player */}
            <div className="mt-8">
              <Link
                to={`/video/${movie.id}`}
                className="inline-block bg-blue-700 text-white px-6 py-2 rounded shadow hover:bg-blue-800 transition"
              >
                ▶ Vezi filmul
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;

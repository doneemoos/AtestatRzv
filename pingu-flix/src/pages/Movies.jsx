// src/pages/Movies.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import movies from "../data/movies";

function Movies() {
  // Inițial afișăm toată lista de filme
  const [filteredMovies] = useState(movies);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Lista Filme</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
            {/* Link-ul care duce către pagina de detalii a filmului */}
            <Link
              to={`/movies/${movie.id}`}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-800"
            >
              Detalii
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;

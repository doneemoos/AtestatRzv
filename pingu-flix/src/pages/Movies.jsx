import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./search"; // Importă componenta Search
import movies from "../data/movies"; // Importă array-ul de filme

function Movies() {
  const [filteredMovies, setFilteredMovies] = useState(movies); // Filmele filtrate

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
       
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-4 py-1 rounded">🎬 Movies</button>
          <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded">📺 TV Shows</button>
        </div>
      </div>

      {/* Bara de căutare */}
      <Search onSearch={setFilteredMovies} /> {/* Trimite funcția de actualizare */}

      {/* Lista de filme */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300 overflow-hidden relative group"
          >
            <div className="relative">
              <img
                src={movie.posterUrl || "https://via.placeholder.com/150"}
                alt={movie.title || "No title"}
                className="w-full h-auto object-cover"
              />
              {movie.quality && (
                <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {movie.quality}
                </span>
              )}
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold leading-tight truncate">{movie.title}</h3>
              <p className="text-xs text-gray-600 mt-1">
                {movie.year || "Unknown year"} • {movie.duration || "Unknown duration"}m
              </p>
              <span className="inline-block mt-2 text-[11px] text-gray-600 border border-gray-300 rounded px-2 py-[2px]">
                Movie
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;




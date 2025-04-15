// Movies.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./search"; // Componenta pentru căutare
import movies from "../data/movies"; // Array-ul complet de filme/seriale

function Movies() {
  // Rezultatele primite de la Search – inițial sunt toate filmele
  const [results, setResults] = useState(movies);
  // Starea pentru categoria selectată; "All" semnifică că nu se aplică un filtru suplimentar
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Se aplică un filtru suplimentar pe rezultatele din Search în funcție de categoria selectată:
  // – Dacă se alege "Movies", se păstrează doar elementele cu type === "Movie"
  // – Dacă se alege "TV Shows", se păstrează doar elementele cu type === "TV Show"
  // – Pentru "All" se folosesc toate rezultatele
  const finalResults =
    selectedCategory === "All"
      ? results
      : results.filter((movie) =>
          movie.type === (selectedCategory === "Movies" ? "Movie" : "TV Show")
        );

  // Funcțiile pentru actualizarea categoriei din butoane
  const handleAllClick = () => setSelectedCategory("All");
  const handleMoviesClick = () => setSelectedCategory("Movies");
  const handleTVShowsClick = () => setSelectedCategory("TV Shows");

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      {/* Butoanele de filtrare */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4">
          <button 
            onClick={handleAllClick}
            className={`px-4 py-1 rounded ${
              selectedCategory === "All"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            🎬 All
          </button>
          <button 
            onClick={handleMoviesClick}
            className={`px-4 py-1 rounded ${
              selectedCategory === "Movies"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            🎬 Movies
          </button>
          <button 
            onClick={handleTVShowsClick}
            className={`px-4 py-1 rounded ${
              selectedCategory === "TV Shows"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            📺 TV Shows
          </button>
        </div>
      </div>

      {/* Componenta Search care actualizează starea "results" */}
      <Search onSearch={setResults} />

      {/* Afișare filme/seriale pe baza rezultatului final (din Search + filtru de categorie) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {finalResults.map((movie) => (
          <Link 
            to={`/movies/${movie.id}`} 
            key={movie.id} 
            className="block bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-1">{movie.title}</h2>
            {movie.posterUrl && (
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-[30rem] object-cover rounded mb-2"
              />
            )}
            <p className="text-sm text-gray-600 mb-2">
              {movie.description || "Fără descriere"}
            </p>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              {movie.category || "Fără categorie"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Movies;

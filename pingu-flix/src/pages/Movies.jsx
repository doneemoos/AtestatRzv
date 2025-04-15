// Movies.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./search"; // Componenta pentru căutare
import movies from "../data/movies"; // Array-ul complet de filme/seriale

function Movies() {
  const [results, setResults] = useState(movies);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showGenres, setShowGenres] = useState(false); // Stare pentru afișarea listei de genuri
  const [selectedGenre, setSelectedGenre] = useState("All"); // Genul selectat

  // Extragem toate genurile unice din lista de filme
  const genres = [...new Set(movies.map((movie) => movie.category))];

  // Filtrăm rezultatele în funcție de categorie și gen
  const finalResults = results.filter((movie) => {
    const matchesCategory =
      selectedCategory === "All" ||
      movie.type === (selectedCategory === "Movies" ? "Movie" : "TV Show");
    const matchesGenre =
      selectedGenre === "All" || movie.category === selectedGenre;

    return matchesCategory && matchesGenre;
  });

  // Funcțiile pentru actualizarea categoriei din butoane
  const handleAllClick = () => setSelectedCategory("All");
  const handleMoviesClick = () => setSelectedCategory("Movies");
  const handleTVShowsClick = () => setSelectedCategory("TV Shows");

  // Funcția pentru selectarea unui gen
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setShowGenres(false); // Ascundem lista după selectarea genului
  };

  // Generăm mesajul dinamic
  const getDynamicMessage = () => {
    if (selectedGenre === "All") {
      return selectedCategory === "All"
        ? "Toate filmele și serialele"
        : selectedCategory === "Movies"
        ? "Toate filmele"
        : "Toate serialele";
    } else {
      return selectedCategory === "All"
        ? `Toate filmele și serialele din categoria ${selectedGenre}`
        : selectedCategory === "Movies"
        ? `Toate filmele din categoria ${selectedGenre}`
        : `Toate serialele din categoria ${selectedGenre}`;
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      {/* Butoanele de filtrare */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4 items-center">
          <button
            onClick={handleAllClick}
            className={`px-4 py-2 rounded font-semibold shadow-md transition-transform duration-300 ${
              selectedCategory === "All"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white scale-105 shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105"
            }`}
          >
            🎬 All
          </button>
          <button
            onClick={handleMoviesClick}
            className={`px-4 py-2 rounded font-semibold shadow-md transition-transform duration-300 ${
              selectedCategory === "Movies"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white scale-105 shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white hover:scale-105"
            }`}
          >
            🎬 Movies
          </button>
          <button
            onClick={handleTVShowsClick}
            className={`px-4 py-2 rounded font-semibold shadow-md transition-transform duration-300 ${
              selectedCategory === "TV Shows"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white scale-105 shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white hover:scale-105"
            }`}
          >
            📺 TV Shows
          </button>

          {/* Buton pentru genuri */}
          <div
            className="relative"
            onMouseEnter={() => setShowGenres(true)}
            onMouseLeave={() => setShowGenres(false)}
          >
            <button
              className={`px-4 py-2 rounded font-semibold shadow-md transition-transform duration-300 ${
                showGenres
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white scale-105 shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white hover:scale-105"
              }`}
            >
              🎭 Genres
            </button>

            {/* Lista de genuri */}
            {showGenres && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-10 w-48 transition-opacity duration-300 opacity-100">
                <ul className="space-y-2">
                  {genres.map((genre) => (
                    <li key={genre}>
                      <button
                        onClick={() => handleGenreClick(genre)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded transition-colors duration-200"
                      >
                        {genre}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => handleGenreClick("All")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded transition-colors duration-200"
                    >
                      All Genres
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Mesaj dinamic */}
          <span className="ml-4 text-lg font-medium text-gray-700">
            {getDynamicMessage()}
          </span>
        </div>
      </div>

      {/* Componenta Search care actualizează starea "results" */}
      <Search onSearch={setResults} />

      {/* Afișare filme/seriale pe baza rezultatului final */}
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

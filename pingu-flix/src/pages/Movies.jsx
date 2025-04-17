// src/pages/Movies.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./search";
import movies from "../data/movies";
import Footer from "../components/footer";

function Movies() {
  const location = useLocation();
  const navigate = useNavigate();

  /* ---------------- Helpers ---------------- */
  const getCategoryFromQuery = () => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    if (type === "tv") return "TV Shows";
    if (type === "movies") return "Movies";
    return "All";
  };

  const [results, setResults] = useState(movies);
  const [selectedCategory, setSelectedCategory] = useState(getCategoryFromQuery());
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [showGenres, setShowGenres] = useState(false);
  const genresDropdownRef = useRef(null);

  /* ---------------- Sync URL ↔ state ---------------- */
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory === "Movies") params.set("type", "movies");
    else if (selectedCategory === "TV Shows") params.set("type", "tv");
    navigate({ pathname: "/Movies", search: params.toString() }, { replace: true });
  }, [selectedCategory, navigate]);

  useEffect(() => {
    setSelectedCategory(getCategoryFromQuery());
  }, [location.search]);

  /* ---------------- Unique genres ---------------- */
  const genres = [...new Set(movies.map((m) => m.category))];

  /* ---------------- Filtered list ---------------- */
  const finalResults = results.filter((m) => {
    const catOk =
      selectedCategory === "All" ||
      m.type === (selectedCategory === "Movies" ? "Movie" : "TV Show");
    const genOk = selectedGenre === "All" || m.category === selectedGenre;
    return catOk && genOk;
  });

  /* ---------------- Dynamic message ---------------- */
  const getDynamicMessage = () => {
    if (selectedGenre === "All") {
      return selectedCategory === "All"
        ? "All movies & TV shows"
        : selectedCategory === "Movies"
        ? "All movies"
        : "All TV shows";
    }
    return selectedCategory === "All"
      ? `All movies & TV shows in ${selectedGenre}`
      : selectedCategory === "Movies"
      ? `All movies in ${selectedGenre}`
      : `All TV shows in ${selectedGenre}`;
  };

  /* ---------------- Close dropdown on outside click ---------------- */
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        genresDropdownRef.current &&
        !genresDropdownRef.current.contains(event.target)
      ) {
        setShowGenres(false);
      }
    }
    if (showGenres) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showGenres]);

  /* ---------------- JSX ---------------- */
  return (
    <div className="integrate">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Filter bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4 items-center">
            {/* Category buttons */}
            {[
              { label: "🎬 All", value: "All" },
              { label: "🎬 Movies", value: "Movies" },
              { label: "📺 TV Shows", value: "TV Shows" },
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setSelectedCategory(value)}
                className={`px-4 py-2 rounded font-semibold shadow-md transition-transform duration-300 ${
                  selectedCategory === value
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white scale-105 shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white hover:scale-105"
                }`}
              >
                {label}
              </button>
            ))}

            {/* Genres dropdown modern */}
            <div className="relative" ref={genresDropdownRef}>
              <button
                onClick={() => setShowGenres((v) => !v)}
                className={`px-4 py-2 rounded font-semibold shadow-md transition-transform duration-300 flex items-center gap-2 ${
                  showGenres || selectedGenre !== "All"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                🎭 {selectedGenre === "All" ? "Genres" : selectedGenre}
                <span
                  className={`transform transition-transform duration-200 ${
                    showGenres ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {showGenres && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-2xl z-50 w-64 py-2 border border-blue-200">
                  <div className="max-h-96 overflow-y-auto">
                    <div className="sticky top-0 bg-gray-50 px-4 py-2 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-700">
                        Genre
                      </h3>
                    </div>
                    <ul className="grid grid-cols-1 gap-1 p-2">
                      <li>
                        <button
                          onClick={() => {
                            setSelectedGenre("All");
                            setShowGenres(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                            selectedGenre === "All"
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-700 hover:bg-blue-100"
                          }`}
                        >
                          All Genres
                        </button>
                      </li>
                      {genres.map((genre) => (
                        <li key={genre}>
                          <button
                            onClick={() => {
                              setSelectedGenre(genre);
                              setShowGenres(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                              selectedGenre === genre
                                ? "bg-blue-50 text-blue-700"
                                : "text-gray-700 hover:bg-blue-100"
                            }`}
                          >
                            {genre}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic message */}
            <span className="ml-4 text-lg font-medium text-gray-700">
              {getDynamicMessage()}
            </span>
          </div>
        </div>

        {/* Search */}
        <Search onSearch={setResults} />

        {/* Results grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {finalResults.map((m) => (
            <Link key={m.id} to={`/movies/${m.id}`} className="block bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-1">{m.title}</h2>
              {m.posterUrl && (
                <img src={m.posterUrl} alt={m.title} className="w-full h-[30rem] object-cover rounded mb-2" />
              )}
              <p className="text-sm text-gray-600 mb-2">{m.description || "No description"}</p>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{m.category || "No category"}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Movies;

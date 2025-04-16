// src/pages/Movies.jsx
import React, { useState, useEffect } from "react";
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

            {/* Genres dropdown (pure CSS hover) */}
            <div className="relative group">
              <button
                className={`px-4 py-2 rounded font-semibold shadow-md transition-transform duration-300 ${
                  selectedGenre !== "All"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white scale-105 shadow-lg"
                    : "bg-gray-200 text-gray-700 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-blue-500 group-hover:text-white hover:scale-105"
                }`}
              >
                🎭 Genres
              </button>

              {/* Dropdown visible while hovering button or menu */}
              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-10 w-48 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
                <ul className="space-y-2">
                  {genres.map((g) => (
                    <li key={g}>
                      <button
                        onClick={() => setSelectedGenre(g)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded transition-colors duration-200"
                      >
                        {g}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => setSelectedGenre("All")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded transition-colors duration-200"
                    >
                      All Genres
                    </button>
                  </li>
                </ul>
              </div>
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

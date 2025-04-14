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
      <Search onSearch={setFilteredMovies} />

      {/* Afișare filme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
      
      </div>
    </div>
  );
}

export default Movies;
// Search.jsx
import React, { useState, useEffect } from "react";
import movies from "../data/movies"; // Array-ul complet de filme

// Componenta Search – gestionează query-ul și filtrează filmele
const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() === "") {
        // Dacă nu există query, se transmit toate filmele
        onSearch(movies);
      } else {
        // Se filtrează după titlu, descriere sau categorie
        const filteredResults = movies.filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          (movie.description &&
            movie.description.toLowerCase().includes(query.toLowerCase())) ||
          (movie.category &&
            movie.category.toLowerCase().includes(query.toLowerCase()))
        );
        onSearch(filteredResults);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, onSearch]);

  return (
    <div className="flex justify-center mb-8">
      <input
        type="text"
        placeholder="Caută filme... ex: comedie, SF, acțiune..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-lg p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
  );
};

export default Search;

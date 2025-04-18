import React, { useState, useEffect } from "react";
import movies from "../data/movies";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    const delayDebounce = setTimeout(() => {
      if (query.trim() === "") {
        onSearch(movies);
      } else {
        const filteredResults = movies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase()) ||
            (movie.description &&
              movie.description.toLowerCase().includes(query.toLowerCase())) ||
            (movie.category &&
              movie.category.toLowerCase().includes(query.toLowerCase()))
        );
        onSearch(filteredResults);
      }
      setIsTyping(false);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, onSearch]);

  return (
    <div className="flex justify-center mb-8 relative">
      {isTyping && (
        <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 text-gray-500 text-sm animate-pulse">
          Searching...<span className="dot-1">.</span>
          <span className="dot-2">.</span>
          <span className="dot-3">.</span>
        </div>
      )}
      <input
        type="text"
        placeholder="Search Movies, Series..."
        autoComplete="on"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-3xl p-5 text-xl rounded-2xl border border-gray-300 shadow-md focus:outline-none focus:ring focus:ring-blue-300 transition-all duration-300 hover:shadow-lg hover:ring hover:ring-blue-400"
      />
    </div>
  );
};

export default Search;

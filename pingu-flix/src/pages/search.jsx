import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import movies from "../data/movies"; // Importă array-ul de filme

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() === "") {
        onSearch(movies); // Trimite toate filmele dacă nu există query
      } else {
        const filteredResults = movies.filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase()) || // Filtrare după titlu
          (movie.description && movie.description.toLowerCase().includes(query.toLowerCase())) || // Filtrare după descriere
          (movie.category && movie.category.toLowerCase().includes(query.toLowerCase())) // Filtrare după categorie
        );
        onSearch(filteredResults); // Trimite rezultatele filtrate
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

const SearchPage = () => {
  const [results, setResults] = useState([]);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">🔍 Caută filme sau seriale</h1>
      <Search onSearch={setResults} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {results.map((item) => (
          <Link
            to={`/${item.episodes ? "show" : "movie"}/${item.id}`}
            key={item.id}
            className="block bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{item.description || "Fără descriere"}</p>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              {item.category || "Fără categorie"}
            </span>
          </Link>
        ))}
        {results.map((movie) => {
          console.log(movie.title); // Verifică dacă filmele sunt afișate de două ori
          return (
            <div key={movie.id}>
              {/* Conținutul filmului */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;

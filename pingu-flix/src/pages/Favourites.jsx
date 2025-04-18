import React, { useEffect, useState } from "react";
import { getFavorites } from "../utils/favourites";
import { auth } from "../firebase";
import movies from "../data/movies";

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!auth.currentUser) return;
      const favIds = await getFavorites(auth.currentUser.uid);
      const favMovies = movies.filter((m) => favIds.includes(m.id));
      setFavoriteMovies(favMovies);
    };
    fetchFavorites();
  }, []);

  return (
    <div>
      <h1>Favorite Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {favoriteMovies.map((movie) => (
          <div key={movie.id} className="bg-white p-4 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-1">{movie.title}</h2>
            {movie.posterUrl && (
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-64 object-cover rounded mb-2"
              />
            )}
            <p className="text-sm text-gray-600 mb-2">
              {movie.description || "No description"}
            </p>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              {movie.category || "No category"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;

// client/src/pages/Movies.jsx
import React, { useEffect, useState } from 'react';

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/movies') // serverul rulează la 5000
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Filme</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie._id} className="bg-white p-4 shadow rounded">
            <h3 className="text-xl font-medium">{movie.title}</h3>
            <p className="text-gray-600">An: {movie.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;

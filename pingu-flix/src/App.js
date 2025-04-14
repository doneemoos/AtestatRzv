import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// Componente proprii
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Movies from "./pages/Movies";
import SearchPage from "./pages/search";
import MovieDetails from "./pages/MoviesDetails";
import VideoPlayer from "./pages/VideoPlayer";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="p-4">
          {user ? (
            <p className="text-green-600">Bun venit, {user.email}!</p>
          ) : (
            <p className="text-red-600">Nu ești autentificat.</p>
          )}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

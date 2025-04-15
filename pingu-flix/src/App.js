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
import Tranding from "./components/tranding";

function App() {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Control pentru mesajul pop-up

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setShowPopup(true); // Afișează mesajul pop-up
        setTimeout(() => {
          setShowPopup(false); // Ascunde mesajul după 5 secunde
        }, 5000);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 relative">
        <Navbar />
        {/* Mesajul pop-up */}
        {showPopup && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
            Bun venit, {user?.email}!
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path="/tranding" element={<Tranding />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

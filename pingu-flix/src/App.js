import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import AuthPage from "./pages/Auth";
import MoviesPage from "./pages/Movies";
import SearchPage from "./pages/search";
import MovieDetails from "./pages/MoviesDetails";
import VideoPlayer from "./pages/VideoPlayer";
import Trending from "./components/trending";
import Account from "./pages/Account";
import Footer from "./components/footer";
import PrivacyPolicy from './pages/privacypolicy';

function App() {
  const user = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!user) return;
    setShowPopup(true);
    const timer = setTimeout(() => setShowPopup(false), 5000);
    return () => clearTimeout(timer);
  }, [user]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 relative">
        <Navbar />

        {showPopup && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
            Bun venit, {user?.email || user?.displayName}!
          </div>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* Video routes */}
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path="/video/:id/episode/:episodeIndex" element={<VideoPlayer />} />
          <Route path="/video/:id/season/:seasonIndex/episode/:episodeIndex" element={<VideoPlayer />} />

          <Route path="/trending" element={<Trending />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
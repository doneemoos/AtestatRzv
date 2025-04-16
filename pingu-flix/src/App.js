import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

/* componente proprii */
import Navbar        from "./components/navbar";
import Home          from "./pages/Home";
import AuthPage      from "./pages/Auth";
import MoviesPage    from "./pages/Movies";
import SearchPage    from "./pages/search";
import MovieDetails  from "./pages/MoviesDetails";   // <- fișierul tău se numește *MoviesDetails.jsx*
import VideoPlayer   from "./pages/VideoPlayer";
import Trending      from "./components/trending";   // fișier: components/trending.jsx
import Footer        from "./components/footer";

function App() {
  /* ----------- autentificare Firebase ----------- */
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (currentUser) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5_000);
      }
    });
    return () => unsubscribe();
  }, []);

  /* ------------------- UI ------------------- */
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 relative">
        <Navbar />

        {/* pop‑up bun‑venit */}
        {showPopup && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
            Bun venit, {user?.email}!
          </div>
        )}

        <Routes>
          {/* principale */}
          <Route path="/"         element={<Home />}      />
          <Route path="/auth"     element={<AuthPage />}  />
          <Route path="/movies"   element={<MoviesPage />} />
          <Route path="/search"   element={<SearchPage />} />

          {/* detalii film / serial */}
          <Route path="/movies/:id" element={<MovieDetails />} />

          {/* redare film sau episod */}
          <Route path="/video/:id"                       element={<VideoPlayer />} />
          <Route path="/video/:id/episode/:episodeIndex" element={<VideoPlayer />} />

          {/* alte pagini */}
          <Route path="/trending" element={<Trending />} />
        </Routes>

        {/* footer global */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;

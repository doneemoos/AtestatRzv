import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* context */
import { useAuth } from "./context/AuthContext";

/* componente proprii */
import Navbar       from "./components/navbar";
import Home         from "./pages/Home";
import AuthPage     from "./pages/Auth";
import MoviesPage   from "./pages/Movies";
import SearchPage   from "./pages/search";
import MovieDetails from "./pages/MoviesDetails";  // fisier: MoviesDetails.jsx
import VideoPlayer  from "./pages/VideoPlayer";
import Trending     from "./components/trending";
import Footer       from "./components/footer";
import Account      from "./pages/Account";

function App() {
  const user = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  /* popup „Bun venit” */
  useEffect(() => {
    if (!user) return;
    setShowPopup(true);
    const t = setTimeout(() => setShowPopup(false), 5_000);
    return () => clearTimeout(t);
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
          {/* principale */}
          <Route path="/"         element={<Home />}      />
          <Route path="/auth"     element={<AuthPage />}  />
          <Route path="/movies"   element={<MoviesPage />} />
          <Route path="/search"   element={<SearchPage />} />
          <Route path="/account"  element={<Account />} />

          {/* detalii film / serial */}
          <Route path="/movies/:id" element={<MovieDetails />} />

          {/* redare film / episod */}
          <Route path="/video/:id"                       element={<VideoPlayer />} />
          <Route path="/video/:id/episode/:episodeIndex" element={<VideoPlayer />} />

          {/* alte pagini */}
          <Route path="/trending" element={<Trending />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

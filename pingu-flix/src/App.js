import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home';     
import Auth from './pages/Auth';      
import Movies from './pages/Movies';
import SearchPage from './pages/search'; // Importă componenta SearchPage
import MovieDetails from "./pages/MoviesDetails";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} /> {/* Asigură-te că apare o singură dată */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/search" element={<SearchPage />} /> {/* Ruta pentru SearchPage */}
          <Route path="/movies/:movieId" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

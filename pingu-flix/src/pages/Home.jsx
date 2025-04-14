import React from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const message = location.state?.message; // Obține mesajul transmis

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {message && <p className="text-green-600 text-lg mb-4">{message}</p>}
      <h1 className="text-3xl font-bold">Pagina Principală</h1>
      {/* Alte conținuturi */}
    </div>
  );
}

export default Home;

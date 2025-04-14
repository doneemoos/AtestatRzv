import React from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const message = location.state?.message; // Obține mesajul transmis

  return (
    <div className="relative w-full h-[70vh] bg-[#0F0C25]">
      <img
        src="/ImageBkgHomepage.png" // Actualizează calea către imaginea dorită
        alt="Hero"
        className="absolute top-0 left-0 w-full h-full object-cover object-[50%_80%] z-[10] opacity-50"
      />

      {/* Textul peste imagine, poziționat în stânga sus */}
      <div className="absolute top-0 left-0 w-full h-full z-[20] p-8 text-white flex flex-col justify-start items-start">
        <h1 className="text-3xl font-bold mb-4">Bun venit la PinguFlix!</h1>
        <p>
          Aceasta este pagina principală a aplicației noastre. Poți explora filmele sau îți poți crea 
          un cont pentru a viziona conținutul!
        </p>
      </div>

    
    </div>
  );
}

export default Home;

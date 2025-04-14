// src/pages/Home.jsx
import React from "react";
import { useLocation } from "react-router-dom";
// Import array-ul de filme
import movies from "../data/movies";

function Home() {
  const location = useLocation();
  const message = location.state?.message;

  // Exemplu: folosim primul film din listă
  const featuredMovie = movies[0];

  return (
    <div
      className="
        relative
        w-full
        h-auto            /* pe mobil, se adaptează la conținut */
        md:min-h-[70vh]   /* pe desktop, avem min. 70vh */
        text-white
        bg-[#0F0C25]
        bg-cover
        bg-center
        bg-no-repeat
      "
      style={{
        backgroundImage: 'url("/ImageBkgHomepage.png")',
      }}
    >
      {/* (Opțional) Stilurile pentru clasa signUpButton – asigură-te că acestea nu sunt deja definite global */}
      <style>{`
        @property --middle-color {
          syntax: '<color>';
          initial-value: rgba(146, 29, 255, 1);
          inherits: false;
        }
        .signUpButton {
          background: linear-gradient(
            330deg,
            rgba(13, 42, 71, 1) 0%,
            var(--middle-color) 50%,
            rgba(13, 42, 71, 1) 98%
          );
          transition: --middle-color 1s ease;
        }
        .signUpButton:hover {
          --middle-color: rgba(34, 120, 207, 0.66);
        }
      `}</style>

      {/* Overlay pentru întunecare (opțional) */}
      <div className="absolute inset-0 bg-[#0F0C25] opacity-50 z-[10]" />

      {/* Conținutul afișat peste overlay */}
      <div className="relative z-[20] p-4 md:p-8">
        {/* 
          Layout general:
            - Pe mobil: flex-col (elementele stivuite vertical)
            - Pe desktop: flex-row (poster stânga, text dreapta)
            - items-center și justify-center / md:justify-between asigură centrarea pe mobil și distribuție între elemente pe desktop 
        */}
        <div className="max-w-[1200px] mx-auto w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-8">
          
          {/* Titlul - vizibil DOAR pe mobil */}
          <div className="block md:hidden w-full text-center mb-2">
            <h1 className="text-3xl font-bold">
              {featuredMovie.title}
            </h1>
          </div>

          {/* Posterul filmului */}
          <div className="w-full md:w-[40%] flex items-center justify-center">
            <img
              src={featuredMovie.posterUrl}
              alt={featuredMovie.title}
              className="
                w-auto
                h-auto
                max-h-[30rem]     /* poster mai mic pe mobil */
                md:max-h-[65vh]   /* poster poate fi mai înalt pe desktop */
                object-contain
                rounded
                shadow-md
              "
            />
          </div>

          {/* Zona de text */}
          <div
            className="
              w-full
              md:w-[60%]
              max-w-sm          /* pe mobil textul e mai îngust (~384px) */
              md:max-w-xl       /* pe desktop textul se poate extinde (~768px) */
              mx-auto
              text-center
              md:text-left
            "
          >
            {/* Titlul - vizibil DOAR pe desktop */}
            <h1 className="hidden md:block text-3xl md:text-4xl font-bold mb-4">
              {featuredMovie.title}
            </h1>

            <p className="text-base mb-3">
              {featuredMovie.description}
            </p>
            <p className="text-sm mb-1">
              <span className="font-semibold">Gen:</span> {featuredMovie.genre}
            </p>
            <p className="text-sm mb-3">
              <span className="font-semibold">IMDb:</span> {featuredMovie.imdbRating}
            </p>
            
            {/* Buton PLAY cu stilul din navbar */}
            <button
              className="
                mt-2
                inline-flex
                items-center
                justify-center
                px-8 py-2.5
                text-white
                text-[20px]
                font-bold
                rounded-[0.8rem]
                shadow-md
                signUpButton
              "
            >
              PLAY
            </button>
          </div>
        </div>
      </div>

      {/* (Opțional) Mesajul primit prin navigate() */}
      {message && (
        <div className="absolute bottom-4 left-4 bg-green-600 text-white px-3 py-2 rounded z-[30]">
          {message}
        </div>
      )}
    </div>
  );
}

export default Home;

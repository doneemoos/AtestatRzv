// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import movies from "../data/movies";
import Tranding from "../components/tranding"; // Importă componenta Tranding

function Home() {
  const location = useLocation();
  const message = location.state?.message;

  // Stările pentru filmul curent și filmul anterior (pentru animația de ieșire)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  // Filmul curent
  const featuredMovie = movies[currentIndex];

  // Schimbare film la fiecare 4.5 secunde, aleatoriu
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      let newIndex = Math.floor(Math.random() * movies.length);
      while (movies.length > 1 && newIndex === currentIndex) {
        newIndex = Math.floor(Math.random() * movies.length);
      }
      setCurrentIndex(newIndex);
    }, 4500);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Eliminăm filmul anterior după 1.5 secunde (durata animației)
  useEffect(() => {
    if (prevIndex !== null) {
      const timer = setTimeout(() => setPrevIndex(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [prevIndex]);

  // Dezactivăm overflow-x în timpul tranziției de 1.5 secunde
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflowX = "";
    }, 1500);
    return () => {
      clearTimeout(timer);
      document.body.style.overflowX = "";
    };
  }, [currentIndex]);

  return (
    <>
      {/* Secțiunea ero */}
      <div
        className="relative flex items-center justify-center w-full h-[88vh] text-white bg-[#09091A] overflow-hidden hero-container"
      >
        {/* Imaginea de fundal */}
        <img
          src="/abstract-blurred-background-light-leaks.jpg"
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-60 transform rotate-180"
        />

        {/* Stiluri CSS pentru animații, buton și override pe telefon */}
        <style>{`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes slideOut {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(-100%);
              opacity: 0;
            }
          }
          .slide-in {
            animation: slideIn 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
          .slide-out {
            animation: slideOut 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
          .film-slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
          }
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
          /* --------- Override layout DOAR pe telefon --------- */
          @media (max-width: 768px) {
            /* Crește min-height pentru a avea loc tot conținutul și a-l urca pe ecran */
            .hero-container {
              min-height: 120vh !important; 
              height: auto !important;
              align-items: flex-start !important;
              padding-top: 3rem;
            }
            .mobile-hero {
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
              width: 100%;
            }
            .film-slide img {
              max-width: 80vw; 
              height: auto;
              margin-bottom: 1rem;
            }
            .film-info-mobile {
              margin: 0 auto;
              text-align: center !important;
              max-width: 90vw;
            }
          }
        `}</style>

        {/* Overlay pentru întunecare */}
        <div className="absolute inset-0 bg-[#0F0C25] opacity-50 z-[10]" />

        {/* Containerul pentru slide-uri – folosim clasa .mobile-hero pentru override pe telefon */}
        <div className="relative z-[20] w-full max-w-[1400px] mx-auto px-4 md:px-8 h-full flex items-center justify-around mobile-hero">
          {/* Slide anterior (dacă există) */}
          {prevIndex !== null && (
            <div
              key={movies[prevIndex].id}
              className="film-slide slide-out flex flex-col md:flex-row items-center justify-around w-full h-full"
            >
              <div className="flex items-center justify-center mb-4 md:mb-0">
                <img
                  src={movies[prevIndex].posterUrl}
                  alt={movies[prevIndex].title}
                  className="object-contain object-center max-h-[70vh] rounded shadow-md"
                />
              </div>
              <div className="text-center md:text-left max-w-sm film-info-mobile">
                <h1 className="hidden md:block text-3xl md:text-4xl font-bold mb-4">
                  {movies[prevIndex].title}
                </h1>
                <p className="text-base mb-3">{movies[prevIndex].description}</p>
                <p className="text-sm mb-1">
                  <span className="font-semibold">Gen:</span>{" "}
                  {movies[prevIndex].category}
                </p>
                <button className="mt-4 inline-flex items-center justify-center px-8 py-2.5 text-white text-[20px] font-bold rounded-[0.8rem] shadow-md signUpButton">
                  PLAY
                </button>
              </div>
            </div>
          )}

          {/* Slide curent */}
          <div
            key={featuredMovie.id}
            className="film-slide slide-in flex flex-col md:flex-row items-center justify-around w-full h-full"
          >
            <div className="flex items-center justify-center mb-4 md:mb-0">
              <img
                src={featuredMovie.posterUrl}
                alt={featuredMovie.title}
                className="object-contain object-center max-h-[70vh] rounded shadow-md"
              />
            </div>
            <div className="text-center md:text-left max-w-sm film-info-mobile">
              <h1 className="hidden md:block text-3xl md:text-4xl font-bold mb-4">
                {featuredMovie.title}
              </h1>
              <p className="text-base mb-3">{featuredMovie.description}</p>
              <p className="text-sm mb-1">
                <span className="font-semibold">Gen:</span>{" "}
                {featuredMovie.category}
              </p>
              <button className="mt-4 inline-flex items-center justify-center px-8 py-2.5 text-white text-[20px] font-bold rounded-[0.8rem] shadow-md signUpButton">
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

      {/* Secțiunea Tranding inserată imediat după hero section */}
      <Tranding />
    </>
  );
}

export default Home;

// src/pages/VideoPlayer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import movies from '../data/movies';

const adVideos = [
  "https://www.w3schools.com/html/movie.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4"
];

const VideoPlayer = () => {
  const { id } = useParams();
  // Comparăm id-ul ca string, deoarece id-urile din movies.js sunt șiruri de caractere
  const movie = movies.find((m) => m.id === id);

  const videoRef = useRef(null);
  const lastClickRef = useRef(null);

  const [showMainVideo, setShowMainVideo] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isAdPlaying, setIsAdPlaying] = useState(true);
  const [overlayAd, setOverlayAd] = useState(false);

  useEffect(() => {
    // Pornim primul ad automat
    setIsAdPlaying(true);
  }, []);

  const handleAdEnded = () => {
    if (currentAdIndex < adVideos.length - 1) {
      setCurrentAdIndex((prev) => prev + 1);
    } else {
      setIsAdPlaying(false);
      setShowMainVideo(true);
    }
  };

  const handleVideoClick = () => {
    const now = Date.now();
    if (!lastClickRef.current || now - lastClickRef.current > 60000) {
      // Dacă au trecut mai mult de 60 secunde de la ultimul click, afișăm un overlay cu reclamă
      setOverlayAd(true);
      setTimeout(() => {
        setOverlayAd(false);
      }, 3000);
    } else {
      // Alternăm play/pause în funcție de starea video-ului
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
    lastClickRef.current = now;
  };

  if (!movie) {
    return <div className="text-center mt-10 text-xl">Filmul nu a fost găsit!</div>;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">{movie.title}</h1>

      <div className="relative">
        {/* Playerul pentru reclame */}
        {isAdPlaying ? (
          <video
            key={currentAdIndex} // Asigură schimbarea reclamei între elementele adVideos
            src={adVideos[currentAdIndex]}
            autoPlay
            controls
            onEnded={handleAdEnded}
            className="w-full rounded-lg shadow-lg"
          />
        ) : (
          // Playerul principal al filmului
          <div className="relative">
            <video
              ref={videoRef}
              onClick={handleVideoClick}
              controls={!overlayAd}
              poster={movie.posterUrl}
              className="w-full rounded-lg shadow-lg"
            >
              <source
                src={movie.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"}
                type="video/mp4"
              />
              Browserul tău nu suportă acest video.
            </video>

            {/* Overlay pentru reclamă la click */}
            {overlayAd && (
              <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                <p className="text-white text-2xl font-bold">
                  Reclamă în desfășurare...
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detalii despre film */}
      {!isAdPlaying && showMainVideo && (
        <>
          <div className="bg-white mt-6 p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              {movie.description || "Descriere indisponibilă."}
            </p>
            <div className="flex flex-wrap gap-4 text-gray-600">
              <p>
                <strong>Categoria:</strong> {movie.category || "Necunoscută"}
              </p>
              <p>
                <strong>Anul:</strong> {movie.year || "Necunoscut"}
              </p>
              <p>
                <strong>Durata:</strong>{" "}
                {movie.duration || "Necunoscută"} minute
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => window.history.back()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              ⬅ Înapoi
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;

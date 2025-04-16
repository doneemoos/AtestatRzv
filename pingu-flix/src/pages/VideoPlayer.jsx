import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import movies from "../data/movies";

const adVideos = ["/ad1.mp4", "/ad2.mp4"];
const overlayAdVideo = "/ad1.mp4";

// Componenta pentru redarea unui episod (nu folosește hook-uri, deci nu este afectată)
const EpisodePlayer = ({ movieId, episodeIndex }) => {
  const movie = movies.find((m) => m.id === movieId);

  if (!movie || !movie.episodes || !movie.episodes[episodeIndex]) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center text-red-600">
        <h2>Episodul nu a fost găsit!</h2>
      </div>
    );
  }

  const episode = movie.episodes[episodeIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">{episode.title}</h1>
      <video
        controls
        className="w-full max-w-4xl rounded-lg shadow"
        src={episode.videoUrl}
      >
        Browserul tău nu suportă acest video.
      </video>
    </div>
  );
};

// Componenta pentru redarea filmului cu gestionarea reclamelor
const MoviePlayer = ({ id }) => {
  // Chiar dacă "movie" nu este găsit, apelăm toate hook-urile înainte de a face un eventual return.
  const movie = movies.find((m) => m.id === id);

  // Apelăm hook-urile necondiționat
  const videoRef = useRef(null);
  const overlayAdRef = useRef(null);
  const [phase, setPhase] = useState("preAds"); // posibile valori: "preAds", "movie", "overlayAd"
  const [adIndex, setAdIndex] = useState(0);
  const [hasShownOverlayAd, setHasShownOverlayAd] = useState(false);
  const [pausedForAd, setPausedForAd] = useState(false);
  const [resumeTime, setResumeTime] = useState(0);

  // Efectul este definit indiferent de condiții
  useEffect(() => {
    if (phase === "movie" && videoRef.current) {
      const interval = setInterval(() => {
        if (
          videoRef.current.currentTime >= 60 &&
          !hasShownOverlayAd &&
          !pausedForAd
        ) {
          setResumeTime(videoRef.current.currentTime);
          videoRef.current.pause();
          setPhase("overlayAd");
          setPausedForAd(true);
          setHasShownOverlayAd(true);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase, hasShownOverlayAd, pausedForAd]);

  // Dacă filmul nu este găsit, redăm un mesaj. Această verificare se face după apelarea hook-urilor,
  // astfel încât regula de hooks este respectată.
  if (!movie) {
    return (
      <div className="text-center mt-10 text-xl">Filmul nu a fost găsit!</div>
    );
  }

  const handleAdEnded = () => {
    if (adIndex < adVideos.length - 1) {
      setAdIndex(adIndex + 1);
    } else {
      setPhase("movie");
    }
  };

  const handleOverlayEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = resumeTime;
    }
    setPhase("movie");
  };

  const handleMovieClick = () => {
    if (videoRef.current) {
      videoRef.current.paused
        ? videoRef.current.play()
        : videoRef.current.pause();
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">{movie.title}</h1>
      <div className="relative">
        {phase === "preAds" ? (
          <video
            key={adIndex}
            src={adVideos[adIndex]}
            autoPlay
            controls
            onEnded={handleAdEnded}
            playsInline
            className="w-full rounded-lg shadow-lg"
          />
        ) : phase === "movie" ? (
          <video
            ref={videoRef}
            src={movie.videoUrl}
            onClick={handleMovieClick}
            controls={phase !== "overlayAd"}
            poster={movie.posterUrl}
            playsInline
            className="w-full rounded-lg shadow-lg"
          >
            Browserul tău nu suportă acest video.
          </video>
        ) : (
          <video
            ref={overlayAdRef}
            src={overlayAdVideo}
            autoPlay
            muted
            onEnded={handleOverlayEnded}
            playsInline
            className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg z-10"
          >
            Browserul tău nu suportă acest video.
          </video>
        )}
      </div>
      {phase === "movie" && (
        <>
          <div className="bg-white mt-6 p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              {movie.description || "Descriere indisponibilă."}
            </p>
            <div className="flex flex-wrap gap-4 text-gray-600">
              <p>
                <strong>Categorie:</strong> {movie.category || "Necunoscută"}
              </p>
              <p>
                <strong>Anul:</strong> {movie.year || "Necunoscut"}
              </p>
              <p>
                <strong>Durata:</strong> {movie.duration || "Necunoscută"} minute
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

// Componenta principală VideoPlayer: apelăm useParams necondiționat,
// apoi în interiorul returnului folosim o expresie ternară pentru a alege între EpisodePlayer și MoviePlayer.
const VideoPlayer = () => {
  const { id, movieId, episodeIndex } = useParams();

  return episodeIndex !== undefined ? (
    <EpisodePlayer movieId={movieId} episodeIndex={episodeIndex} />
  ) : (
    <MoviePlayer id={id} />
  );
};

export default VideoPlayer;

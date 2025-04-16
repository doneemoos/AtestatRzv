import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import movies from "../data/movies";

const preRollAds = ["/ad1.mp4", "/ad2.mp4"]; // Multiple reclame pre-roll
const overlayAdVideo = "/ad1.mp4"; // Reclama overlay

// Componenta pentru redarea unui episod (fără gestionare reclame)
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

// Componenta de redare a filmului cu gestionarea reclamelor
const MoviePlayer = ({ id }) => {
  const movie = movies.find((m) => m.id === id);
  const videoRef = useRef(null);

  // Stări pentru gestionarea secvenței:
  // phase: "preroll", "movie" sau "overlay"
  const [phase, setPhase] = useState("preroll");
  // adIndex pentru reclamele pre-roll curente (0 sau 1)
  const [adIndex, setAdIndex] = useState(0);
  // Pentru a reține secunda la care se întrerupe filmul, pentru reluare
  const [resumeTime, setResumeTime] = useState(0);
  // Flag pentru a ne asigura că reclama overlay se redă o singură dată
  const [overlayPlayed, setOverlayPlayed] = useState(false);

  // La montare, setăm sursa inițială ca fiind prima reclamă pre-roll
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.src = preRollAds[0];
      video.play().catch((err) =>
        console.warn("Autoplay failed; poate e necesară o interacțiune din partea utilizatorului.", err)
      );
    }
  }, []);

  // Handler pentru evenimentul onEnded (sfârșitul redării clipului curent)
  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    if (phase === "preroll") {
      // Dacă mai avem reclame pre-roll de redat
      if (adIndex < preRollAds.length - 1) {
        const nextAdIndex = adIndex + 1;
        setAdIndex(nextAdIndex);
        video.src = preRollAds[nextAdIndex];
        video.play();
      } else {
        // Am terminat reclamele pre-roll; comutăm la film
        setPhase("movie");
        video.src = movie.videoUrl;
        video.play();
      }
    } else if (phase === "overlay") {
      // La finalul reclamei overlay, revenim la film
      setPhase("movie");
      video.src = movie.videoUrl;
      // În momentul încărcării metadatelor, vom seta currentTime la resumeTime
      video.play();
    } else if (phase === "movie") {
      // Dacă filmul s-a terminat
      console.log("Filmul s-a încheiat.");
    }
  };

  // Handler pentru onTimeUpdate, monitorizează progresul filmului
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    // În faza de film, verificăm dacă a ajuns la 60 de secunde
    if (phase === "movie" && !overlayPlayed) {
      if (video.currentTime >= 60) {
        // Salvăm secunda de întrerupere
        setResumeTime(video.currentTime);
        // Marcăm că reclama overlay va fi redată o singură dată
        setOverlayPlayed(true);
        // Comutăm la faza overlay
        setPhase("overlay");
        video.pause();
        video.src = overlayAdVideo;
        video.play();
      }
    }
  };

  // Handler pentru onLoadedMetadata. Folosit la revenirea la film după overlay,
  // asigură setarea timpului corect (resumeTime) după ce sursa filmului a fost încărcată.
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    if (phase === "movie" && resumeTime > 0) {
      video.currentTime = resumeTime;
      // Resetăm resumeTime pentru a evita aplicarea lui la alte încărcări
      setResumeTime(0);
    }
  };

  if (!movie) {
    return (
      <div className="text-center mt-10 text-xl">Filmul nu a fost găsit!</div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">{movie.title}</h1>

      {/* Elementul video unificat */}
      <video
        ref={videoRef}
        controls
        playsInline
        poster={movie.posterUrl}
        className="w-full rounded-lg shadow-lg"
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      >
        Browserul tău nu suportă acest video.
      </video>

      {/* Detaliile filmului și butonul de navigare, afișate după terminarea reclamelor pre-roll */}
      {phase !== "preroll" && (
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

// Componenta principală VideoPlayer care determină dacă se redă un episod sau un film
const VideoPlayer = () => {
  const { id, movieId, episodeIndex } = useParams();

  return episodeIndex !== undefined ? (
    <EpisodePlayer movieId={movieId} episodeIndex={episodeIndex} />
  ) : (
    <MoviePlayer id={id} />
  );
};

export default VideoPlayer;

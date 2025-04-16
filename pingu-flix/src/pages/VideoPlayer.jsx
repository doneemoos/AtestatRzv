import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import movies from "../data/movies";

const preRollAds = ["/ad1.mp4", "/ad2.mp4"];
const overlayAdVideo = "/ad1.mp4";

/* ───────────────────────────────── Episode Player ────────────────────────── */

const EpisodePlayer = ({ movieId, episodeIndex }) => {
  const movie = movies.find((m) => m.id === movieId);
  const idx = Number(episodeIndex);

  if (!movie || !movie.episodes?.[idx]) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center text-red-600">
        <h2>Episodul nu a fost găsit!</h2>
      </div>
    );
  }

  const episode = movie.episodes[idx];

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

/* ───────────────────────────────── Movie Player ──────────────────────────── */

const MoviePlayer = ({ id }) => {
  const movie = movies.find((m) => m.id === id);
  const videoRef = useRef(null);

  const [phase, setPhase] = useState("preroll");   // "preroll" | "movie" | "overlay"
  const [adIndex, setAdIndex] = useState(0);
  const [resumeTime, setResumeTime] = useState(0);
  const [overlayPlayed, setOverlayPlayed] = useState(false);

  // La montare: pornește prima reclamă
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.src = preRollAds[0];
      v.play().catch(() => {/* autoplay block */});
    }
  }, []);

  const handleEnded = () => {
    const v = videoRef.current;
    if (!v) return;

    if (phase === "preroll") {
      if (adIndex < preRollAds.length - 1) {
        const next = adIndex + 1;
        setAdIndex(next);
        v.src = preRollAds[next];
        v.play();
      } else {
        setPhase("movie");
        v.src = movie.videoUrl;
        v.play();
      }
    } else if (phase === "overlay") {
      setPhase("movie");
      v.src = movie.videoUrl;
      v.play();
    }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;

    if (phase === "movie" && !overlayPlayed && v.currentTime >= 60) {
      setResumeTime(v.currentTime);
      setOverlayPlayed(true);
      setPhase("overlay");
      v.pause();
      v.src = overlayAdVideo;
      v.play();
    }
  };

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    if (phase === "movie" && resumeTime > 0) {
      v.currentTime = resumeTime;
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

      {phase !== "preroll" && (
        <>
          <div className="bg-white mt-6 p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              {movie.description || "Descriere indisponibilă."}
            </p>
            <div className="flex flex-wrap gap-4 text-gray-600">
              <p>
                <strong>Categorie:</strong> {movie.category}
              </p>
              <p>
                <strong>Anul:</strong> {movie.year}
              </p>
              <p>
                <strong>Durata:</strong> {movie.duration}
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

/* ─────────────────────────────── Main Wrapper ────────────────────────────── */

const VideoPlayer = () => {
  const { id, episodeIndex } = useParams();

  return episodeIndex !== undefined ? (
    <EpisodePlayer movieId={decodeURIComponent(id)} episodeIndex={episodeIndex} />
  ) : (
    <MoviePlayer id={decodeURIComponent(id)} />
  );
};

export default VideoPlayer;

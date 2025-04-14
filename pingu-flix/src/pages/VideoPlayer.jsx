import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import movies from "../data/movies";

const adVideos = ["/ad1.mp4", "/ad2.mp4"];
const overlayAdVideo = "/ad1.mp4";

const VideoPlayer = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === id);

  const videoRef = useRef(null);
  const overlayAdRef = useRef(null);

  const [phase, setPhase] = useState("preAds"); // preAds | movie | overlayAd
  const [adIndex, setAdIndex] = useState(0);
  const [hasShownOverlayAd, setHasShownOverlayAd] = useState(false);
  const [pausedForAd, setPausedForAd] = useState(false);
  const [resumeTime, setResumeTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

        // actualizează dacă video-ul e pe pauză
        if (videoRef.current.paused) {
          setIsPaused(true);
        } else {
          setIsPaused(false);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [phase, hasShownOverlayAd, pausedForAd]);

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
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handlePlayButton = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const showBigPlayButton = phase === "movie" && isPaused;

  if (!movie) {
    return (
      <div className="text-center mt-10 text-xl">Filmul nu a fost găsit!</div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">{movie.title}</h1>

      <div className="relative">
        {/* Reclame inițiale */}
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
          <>
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

            {/* Buton mare de tip Netflix */}
            {showBigPlayButton && (
              <button
                onClick={handlePlayButton}
                className="absolute inset-0 flex items-center justify-center z-20"
              >
                <div className="bg-black/60 text-white rounded-full w-20 h-20 flex items-center justify-center text-4xl hover:scale-110 transition">
                  ►
                </div>
              </button>
            )}
          </>
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

export default VideoPlayer;

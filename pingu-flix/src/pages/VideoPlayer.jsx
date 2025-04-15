import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import movies from "../data/movies";

const adVideos = ["/ad1.mp4", "/ad2.mp4"];
const overlayAdVideo = "/ad1.mp4";

const VideoPlayer = () => {
  // Try to get both sets of params; one of these will be defined depending on the route.
  const { id, movieId, episodeIndex } = useParams();

  // If we have an episodeIndex then we assume we're playing an episode.
  if (episodeIndex !== undefined) {
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
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // Otherwise, assume we're playing a full movie with ad logic.
  const movie = movies.find((m) => m.id === id);
  if (!movie) {
    return (
      <div className="text-center mt-10 text-xl">Filmul nu a fost găsit!</div>
    );
  }

  // References for the video elements
  const videoRef = useRef(null);
  const overlayAdRef = useRef(null);

  // Component state for managing ad phases and video playback
  const [phase, setPhase] = useState("preAds"); // Possible values: preAds | movie | overlayAd
  const [adIndex, setAdIndex] = useState(0);
  const [hasShownOverlayAd, setHasShownOverlayAd] = useState(false);
  const [pausedForAd, setPausedForAd] = useState(false);
  const [resumeTime, setResumeTime] = useState(0);

  // Monitor movie playback to decide when to show the overlay ad
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

  // Function to handle the end of a pre-roll ad video
  const handleAdEnded = () => {
    if (adIndex < adVideos.length - 1) {
      setAdIndex(adIndex + 1);
    } else {
      setPhase("movie");
    }
  };

  // Function to handle the end of the overlay ad video
  const handleOverlayEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = resumeTime;
    }
    setPhase("movie");
  };

  // Function to pause/play movie when clicking on it
  const handleMovieClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
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
            controls={phase !== "overlayAd"} // Hide controls if in overlay ad phase
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

export default VideoPlayer;

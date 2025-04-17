import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import movies from "../data/movies";

// ─── Fișiere publicitare ─────────────────────────────────────────────────
const preRollAds = ["/ad1.mp4", "/ad2.mp4"];
const overlayAdVideo = "/ad1.mp4";

// ─── COMPONENTA: PlayerWithAds ─────────────────────────────────────────────
const PlayerWithAds = ({ title, videoUrl, posterUrl, description, extraInfo }) => {
  const videoRef = useRef(null);
  const [phase, setPhase] = useState("preroll");
  const [adIndex, setAdIndex] = useState(0);
  const [resumeTime, setResumeTime] = useState(0);
  const [overlayPlayed, setOverlayPlayed] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.src = preRollAds[0];
      v.play().catch(() => {});
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
        setPhase("main");
        v.src = videoUrl;
        v.play();
      }
    } else if (phase === "overlay") {
      setPhase("main");
      v.src = videoUrl;
      v.play();
    }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    if (phase === "main" && !overlayPlayed && v.currentTime >= 60) {
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
    if (phase === "main" && resumeTime > 0) {
      v.currentTime = resumeTime;
      setResumeTime(0);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">{title}</h1>
      <video
        ref={videoRef}
        controls
        playsInline
        poster={posterUrl}
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
            {description && <p className="text-gray-700 mb-4">{description}</p>}
            {extraInfo}
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

// ─── COMPONENTA PRINCIPALĂ: VideoPlayer ─────────────────────────────────────
const VideoPlayer = () => {
  const { id, seasonIndex, episodeIndex } = useParams();
  const decodedId = decodeURIComponent(id);
  const movie = movies.find((m) => m.id === decodedId);

  if (!movie) {
    return (
      <div className="text-center mt-10 text-xl text-red-600">
        Conținutul nu a fost găsit!
      </div>
    );
  }

  if (episodeIndex !== undefined) {
    const epIdx = Number(episodeIndex);
    const sIdx = seasonIndex !== undefined ? Number(seasonIndex) : 0;
    const episodes = movie.seasons?.[sIdx]?.episodes || movie.episodes;
    const episode = episodes?.[epIdx];

    if (!episode) {
      return (
        <div className="text-center mt-10 text-xl text-red-600">
          Episodul nu a fost găsit!
        </div>
      );
    }

    return (
      <PlayerWithAds
        title={episode.title}
        videoUrl={episode.videoUrl}
        posterUrl={movie.posterUrl}
        description={movie.description}
        extraInfo={
          <p className="text-gray-600">
            <strong>Serial:</strong> {movie.title} &nbsp; | &nbsp;
            <strong>Sezon:</strong> {sIdx + 1} &nbsp; | &nbsp;
            <strong>Episod:</strong> {epIdx + 1}
          </p>
        }
      />
    );
  }

  return (
    <PlayerWithAds
      title={movie.title}
      videoUrl={movie.videoUrl}
      posterUrl={movie.posterUrl}
      description={movie.description}
      extraInfo={
        <div className="flex flex-wrap gap-4 text-gray-600">
          <p><strong>Categorie:</strong> {movie.category}</p>
          <p><strong>Anul:</strong> {movie.year}</p>
          <p><strong>Durata:</strong> {movie.duration}</p>
        </div>
      }
    />
  );
};

export default VideoPlayer;
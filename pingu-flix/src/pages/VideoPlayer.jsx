import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import movies from "../data/movies";

// ─── Fișiere publicitare ─────────────────────────────────────────────────
const preRollAds = ["/ad1.mp4", "/ad2.mp4"];
const overlayAdVideo = "/ad1.mp4";

// ─── COMPONENTA: CustomVideoPlayer ─────────────────────────────────────────
function CustomVideoPlayer({ title, videoUrl, posterUrl, description, extraInfo }) {
  const videoRef = useRef(null);

  // Stări player și metadate
  const [phase, setPhase] = useState("preroll");
  const [adIndex, setAdIndex] = useState(0);
  const [resumeTime, setResumeTime] = useState(0);
  const [overlayPlayed, setOverlayPlayed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Încarcă primul ad
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.src = preRollAds[0];
      v.play().catch(() => {});
      setPlaying(true);
    }
  }, []);

  // La finalul fiecărui clip (ad sau main)
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

  // Time update pentru overlay
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime);

    if (phase === "main" && !overlayPlayed && v.currentTime >= 60) {
      setResumeTime(v.currentTime);
      setOverlayPlayed(true);
      setPhase("overlay");
      v.pause();
      v.src = overlayAdVideo;
      v.play();
    }
  };

  // Metadate încărcate (resume)
  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration);
    if (phase === "main" && resumeTime > 0) {
      v.currentTime = resumeTime;
      setResumeTime(0);
    }
  };

  // Controls custom
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.pause(); else v.play();
    setPlaying(!playing);
  };

  const handleSeek = e => {
    const v = videoRef.current;
    v.currentTime = parseFloat(e.target.value);
    setCurrentTime(v.currentTime);
  };

  const handleVolumeChange = e => {
    const v = videoRef.current;
    const vol = parseFloat(e.target.value);
    v.volume = vol;
    setVolume(vol);
  };

  const handleSpeedChange = e => {
    const v = videoRef.current;
    const sp = parseFloat(e.target.value);
    v.playbackRate = sp;
    setSpeed(sp);
  };

  const toggleFullscreen = () => {
    const el = videoRef.current;
    if (!el) return;
    if (!isFullscreen) el.requestFullscreen?.(); else document.exitFullscreen?.();
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = t => {
    const m = Math.floor(t / 60).toString().padStart(2, '0');
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">{title}</h1>
      <div className="relative bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          poster={posterUrl}
          className="w-full"
          onEnded={handleEnded}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />

        {(phase === 'preroll' || phase === 'overlay') && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded">
            RECLAMĂ
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4 flex items-center gap-4">
          <button onClick={togglePlay} className="text-white">
            {playing ? '❚❚' : '►'}
          </button>
          <span className="text-white text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <input
            type="range"
            min={0}
            max={duration}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="flex-grow"
          />
          <input
            type="range"
            min={0}
            max={1}
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24"
          />
          <select value={speed} onChange={handleSpeedChange} className="text-white">
            {[0.5, 1, 1.5, 2].map(sp => (
              <option key={sp} value={sp}>{sp}×</option>
            ))}
          </select>
          <button onClick={toggleFullscreen} className="text-white">
            {isFullscreen ? '🡼' : '🡾'}
          </button>
        </div>
      </div>

      {phase === 'main' && (
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
}

// ─── COMPONENTA PRINCIPALĂ: VideoPlayer ─────────────────────────────────────
export default function VideoPlayer() {
  const { id, seasonIndex, episodeIndex } = useParams();
  const decodedId = decodeURIComponent(id);
  const movie = movies.find(m => m.id === decodedId);

  if (!movie) {
    return (
      <div className="text-center mt-10 text-xl text-red-600">Conținutul nu a fost găsit!</div>
    );
  }

  if (episodeIndex !== undefined) {
    const epIdx = Number(episodeIndex);
    const sIdx = seasonIndex !== undefined ? Number(seasonIndex) : 0;
    const episodes = movie.seasons?.[sIdx]?.episodes || movie.episodes;
    const episode = episodes?.[epIdx];

    if (!episode) {
      return (
        <div className="text-center mt-10 text-xl text-red-600">Episodul nu a fost găsit!</div>
      );
    }

    return (
      <CustomVideoPlayer
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
    <CustomVideoPlayer
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
}

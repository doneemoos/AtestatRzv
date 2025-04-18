import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import movies from "../data/movies";
import {
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";

const preRollAds = ["/ad1.mp4", "/ad2.mp4"];
const overlayAdVideo = "/ad1.mp4";

function CustomVideoPlayer({
  title,
  videoUrl,
  posterUrl,
  description,
  extraInfo,
}) {
  const videoRef = useRef(null);

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

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.src = preRollAds[0];
      v.play().catch(() => {});
      setPlaying(true);
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

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration);
    if (phase === "main" && resumeTime > 0) {
      v.currentTime = resumeTime;
      setResumeTime(0);
    }
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.pause();
    else v.play();
    setPlaying(!playing);
  };

  const handleSeek = (e) => {
    const v = videoRef.current;
    v.currentTime = parseFloat(e.target.value);
    setCurrentTime(v.currentTime);
  };

  const handleVolumeChange = (e) => {
    const v = videoRef.current;
    const vol = parseFloat(e.target.value);
    v.volume = vol;
    setVolume(vol);
  };

  const toggleFullscreen = () => {
    const el = videoRef.current;
    if (!el) return;
    if (!isFullscreen) el.requestFullscreen?.();
    else document.exitFullscreen?.();
    setIsFullscreen(!isFullscreen);
  };

  const handleSpeedChange = (e) => {
    const v = videoRef.current;
    const sp = parseFloat(e.target.value);
    v.playbackRate = sp;
    setSpeed(sp);
  };

  const formatTime = (t) => {
    const m = Math.floor(t / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-screen bg-[#281564]">
      <div className="max-w-[1200px] mx-auto px-4 py-8 bg-[#281564] min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-6 text-white">
          {title}
        </h1>
        <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
          <video
            ref={videoRef}
            poster={posterUrl}
            className="w-full aspect-video"
            onEnded={handleEnded}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />

          {(phase === "preroll" || phase === "overlay") && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full font-semibold text-sm tracking-wider animate-pulse">
              AD
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
            {/* Progress Bar */}
            <div className="relative w-full h-1 bg-gray-600 rounded-full mb-4 cursor-pointer group">
              <div
                className="absolute h-full bg-red-600 rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              <input
                type="range"
                min={0}
                max={duration}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
              <button
                onClick={togglePlay}
                className="text-white hover:text-red-500 transition"
              >
                {playing ? <FaPause size={20} /> : <FaPlay size={20} />}
              </button>

              <div className="text-white text-sm font-medium">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              <div className="flex items-center gap-2 group relative">
                <button
                  onClick={() => setVolume(volume === 0 ? 1 : 0)}
                  className="text-white hover:text-red-500 transition"
                >
                  {volume === 0 ? (
                    <FaVolumeMute size={20} />
                  ) : (
                    <FaVolumeUp size={20} />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-0 group-hover:w-24 transition-all duration-300"
                />
              </div>

              <div className="flex-grow" />

              <select
                value={speed}
                onChange={handleSpeedChange}
                className="bg-transparent text-white border border-gray-600 rounded px-2 py-1 text-sm hover:border-red-500 transition"
              >
                {[0.5, 1, 1.5, 2].map((sp) => (
                  <option key={sp} value={sp} className="bg-gray-900">
                    {sp}×
                  </option>
                ))}
              </select>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-red-500 transition"
              >
                {isFullscreen ? (
                  <FaCompress size={20} />
                ) : (
                  <FaExpand size={20} />
                )}
              </button>
            </div>
          </div>
        </div>

        {phase === "main" && (
          <div className="mt-8 space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
              {description && (
                <p className="text-gray-300 leading-relaxed">{description}</p>
              )}
              <div className="mt-4 text-gray-400">{extraInfo}</div>
            </div>

            <div className="text-center">
              <button
                onClick={() => window.history.back()}
                className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold 
                         hover:bg-red-700 transform hover:scale-105 transition duration-300"
              >
                Back to Browse
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VideoPlayer() {
  const { id, seasonIndex, episodeIndex } = useParams();
  const decodedId = decodeURIComponent(id);
  const movie = movies.find((m) => m.id === decodedId);

  if (!movie) {
    return (
      <div className="text-center mt-10 text-xl text-red-600">
        Content not found!
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
          Episode not found!
        </div>
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
            <strong>Series:</strong> {movie.title} &nbsp; | &nbsp;
            <strong>Season:</strong> {sIdx + 1} &nbsp; | &nbsp;
            <strong>Episode:</strong> {epIdx + 1}
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
          <p>
            <strong>Category:</strong> {movie.category}
          </p>
          <p>
            <strong>Year:</strong> {movie.year}
          </p>
          <p>
            <strong>Duration:</strong> {movie.duration}
          </p>
        </div>
      }
    />
  );
}

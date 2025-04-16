import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import movies from "../data/movies";

/* ───── fișiere video publicitare ───── */
const preRollAds     = ["/ad1.mp4", "/ad2.mp4"];   // două reclame la început
const overlayAdVideo = "/ad1.mp4";                 // reclama la minutul 1

/* ───────────────────────────────────────────────────────────────────────────
   COMPONENTĂ UNICĂ: PlayerWithAds
   primește titlu, videoUrl, poster, descriere și (opțional) info extra.
   Se ocupă de:
   • rularea celor 2 pre‑roll‑uri          (phase: "preroll")
   • filmul / episodul propriu‑zis         (phase: "main")
   • overlay‑ad la 60 sec.                 (phase: "overlay")
─────────────────────────────────────────────────────────────────────────── */
const PlayerWithAds = ({
  title,
  videoUrl,
  posterUrl,
  description,
  extraInfo = null,
}) => {
  const videoRef = useRef(null);

  /* "preroll" | "main" | "overlay" */
  const [phase, setPhase] = useState("preroll");

  /* indexul reclamei din preRollAds */
  const [adIndex, setAdIndex] = useState(0);

  /* secunda la care întrerupem pentru overlay */
  const [resumeTime, setResumeTime] = useState(0);

  /* ne asigurăm că overlay‑ul rulează o singură dată */
  const [overlayPlayed, setOverlayPlayed] = useState(false);

  /* pornim prima reclamă la montare */
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.src = preRollAds[0];
      v.play().catch(() => {/* autoplay blocked */});
    }
  }, []);

  /* când clipul curent se termină */
  const handleEnded = () => {
    const v = videoRef.current;
    if (!v) return;

    if (phase === "preroll") {
      /* mai avem reclame? */
      if (adIndex < preRollAds.length - 1) {
        const next = adIndex + 1;
        setAdIndex(next);
        v.src = preRollAds[next];
        v.play();
      } else {
        /* trecem la conținutul principal */
        setPhase("main");
        v.src = videoUrl;
        v.play();
      }
    } else if (phase === "overlay") {
      /* revenim la conținutul principal după overlay */
      setPhase("main");
      v.src = videoUrl;
      v.play();
    }
  };

  /* verificăm timpul curent pentru overlay‑ad */
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

  /* când sursa (film/episod) se încarcă din nou -> revenim la secunda anterioară */
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

      {/* afișăm descrierea & info doar după pre‑roll */}
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

/* ───────────────────────────────────────────────────────────────────────────
   Componenta principală – decide dacă redăm un film sau un episod
─────────────────────────────────────────────────────────────────────────── */
const VideoPlayer = () => {
  const { id, episodeIndex } = useParams();
  const decodedId = decodeURIComponent(id);
  const movie = movies.find((m) => m.id === decodedId);

  /* nu am găsit filmul / serialul */
  if (!movie) {
    return (
      <div className="text-center mt-10 text-xl text-red-600">
        Conținutul nu a fost găsit!
      </div>
    );
  }

  /* ─────── caz: EPISOD (serial) ─────── */
  if (episodeIndex !== undefined) {
    const idx = Number(episodeIndex);
    const episode = movie.episodes?.[idx];

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
            <strong>Episod:</strong> {idx + 1}
          </p>
        }
      />
    );
  }

  /* ─────── caz: FILM întreg ─────── */
  return (
    <PlayerWithAds
      title={movie.title}
      videoUrl={movie.videoUrl}
      posterUrl={movie.posterUrl}
      description={movie.description}
      extraInfo={
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
      }
    />
  );
};

export default VideoPlayer;

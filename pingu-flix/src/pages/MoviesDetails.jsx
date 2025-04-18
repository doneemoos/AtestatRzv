import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import movies from "../data/movies";
import { useAuth } from "../context/AuthContext";
import { addToList, removeFromList } from "../utils/db";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function MovieDetails() {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id);
  const movie = movies.find((m) => m.id === decodedId);
  const user = useAuth();

  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(
    movie?.seasons?.length > 0 ? 0 : null
  );

  useEffect(() => {
    if (!user || !movie) return;
    const fetchStatus = async () => {
      const likeRef = doc(db, "users", user.uid, "likes", movie.id);
      const favRef = doc(db, "users", user.uid, "favorites", movie.id);
      const [likeSnap, favSnap] = await Promise.all([
        getDoc(likeRef),
        getDoc(favRef),
      ]);
      setLiked(likeSnap.exists());
      setFavorited(favSnap.exists());
    };
    fetchStatus();
  }, [user, movie]);

  const toggle = async (list, setter, current) => {
    if (!user) {
      alert("You must be logged in to use this feature!");
      return;
    }
    if (current) {
      await removeFromList(user.uid, list, movie.id);
    } else {
      await addToList(user.uid, list, movie);
    }
    setter(!current);
  };

  if (!movie) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center text-red-600">
        <h2>Movie not found!</h2>
      </div>
    );
  }

  const watchLink =
    movie.type === "TV Show"
      ? `/video/${encodeURIComponent(
          movie.id
        )}/season/${selectedSeason}/episode/0`
      : `/video/${encodeURIComponent(movie.id)}`;

  return (
    <div className="relative min-h-screen bg-[#11015e]">
      <style>{`
        @property --middle-color {
          syntax: '<color>';
          initial-value: rgba(146, 29, 255, 0.66);
          inherits: false;
        }
        .signUpButton {
          background: linear-gradient(330deg, rgba(13,42,71,1) 0%, var(--middle-color) 50%, rgba(13,42,71,1) 98%);
          transition: --middle-color 1s ease;
        }
        .signUpButton:hover { --middle-color: rgba(34,120,207,0.66); }
      `}</style>

      <div
        className="absolute inset-0 h-96 bg-cover bg-center blur-sm brightness-50"
        style={{ backgroundImage: `url(${movie.posterUrl})` }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="bg-[#140046] text-white rounded-xl shadow-lg flex flex-col md:flex-row p-6">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full md:w-1/4 rounded-lg shadow object-cover"
          />

          <div className="text-white flex-1 md:ml-8 mt-6 md:mt-0 flex flex-col">
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>

            <div className="flex items-center gap-2 mb-2">
              <button className="signUpButton text-xs px-2 py-1 rounded">
                Trailer
              </button>
              <button className="signUpButton text-xs px-2 py-1 rounded">
                HD
              </button>
            </div>

            <p className="text-white mb-4 flex-1">{movie.description}</p>

            <div className="text-sm text-white space-y-1 mb-4">
              <p>
                <strong>Released:</strong> {movie.year}
              </p>
              <p>
                <strong>Genre:</strong> {movie.category}
              </p>
              <p>
                <strong>Duration:</strong> {movie.duration || "N/A"}
              </p>
              <p>
                <strong>Country:</strong> {movie.country || "N/A"}
              </p>
              <p>
                <strong>Production:</strong> {movie.production || "N/A"}
              </p>
              <p>
                <strong>Casts:</strong> {movie.casts || "N/A"}
              </p>
            </div>

            {movie.type === "TV Show" && movie.seasons?.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Seasons</h2>
                <div className="flex gap-4 mb-4">
                  {movie.seasons.map((s, idx) => (
                    <button
                      key={s.season}
                      onClick={() => setSelectedSeason(idx)}
                      className={`signUpButton px-3 py-1 rounded transition ${
                        idx === selectedSeason
                          ? "--middle-color: rgba(34,120,207,0.66); text-white"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      Season {s.season}
                    </button>
                  ))}
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Episodes - Season {movie.seasons[selectedSeason].season}
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {movie.seasons[selectedSeason].episodes.map((ep, i) => (
                      <Link
                        key={i}
                        to={`/video/${encodeURIComponent(
                          movie.id
                        )}/season/${selectedSeason}/episode/${i}`}
                        className="signUpButton px-4 py-2 rounded-lg shadow text-white transition"
                      >
                        {ep.title || `Episode ${i + 1}`}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <button
                onClick={() => toggle("likes", setLiked, liked)}
                className="signUpButton px-4 py-1 rounded text-white transition"
              >
                {liked ? "❤️ Liked" : "👍 Like"}
              </button>

              <button
                onClick={() => toggle("favorites", setFavorited, favorited)}
                className="signUpButton px-4 py-1 rounded text-white transition"
              >
                {favorited ? "⭐ Favorited" : "➕ Add to favorites"}
              </button>
            </div>

            <div className="mt-4">
              <Link
                to={watchLink}
                className="signUpButton text-white px-5 py-2 rounded-lg transition inline-block"
              >
                ▶ Watch Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

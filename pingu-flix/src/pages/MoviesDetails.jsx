import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import movies from "../data/movies";
import Footer from "../components/footer";
import { useAuth } from "../context/AuthContext";
import { addToList, removeFromList } from "../utils/db";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function MovieDetails() {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === decodeURIComponent(id));
  const user = useAuth();
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(
    movie?.seasons?.length > 0 ? 0 : null
  );

  useEffect(() => {
    if (!user || !movie) return;
    (async () => {
      const likeSnap = await getDoc(doc(db, "users", user.uid, "likes", movie.id));
      const favSnap = await getDoc(doc(db, "users", user.uid, "favorites", movie.id));
      setLiked(likeSnap.exists());
      setFavorited(favSnap.exists());
    })();
  }, [user, movie]);

  const toggle = async (list, setter, state) => {
    if (!user) {
      alert("Trebuie să fii logat ca să folosești această funcție!");
      return;
    }
    if (state) await removeFromList(user.uid, list, movie.id);
    else await addToList(user.uid, list, movie);
    setter(!state);
  };

  if (!movie) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center text-red-600">
        <h2>Filmul nu a fost găsit!</h2>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* background blur */}
      <div
        className="absolute inset-0 h-96 bg-cover bg-center blur-sm brightness-50"
        style={{ backgroundImage: `url(${movie.posterUrl})` }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row p-6">
          {/* poster */}
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full md:w-1/4 rounded-lg shadow object-cover"
          />

          {/* details */}
          <div className="flex-1 md:ml-8 mt-6 md:mt-0">
            <Link
              to={
                movie.type === "TV Show"
                  ? `/video/${encodeURIComponent(movie.id)}/season/${selectedSeason}/episode/0`
                  : `/video/${encodeURIComponent(movie.id)}`
              }
              className="bg-blue-600 text-white px-5 py-2 rounded-lg mb-4 inline-block"
            >
              ▶ Watch now
            </Link>

            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            <div className="flex items-center gap-2 mb-2">
              <button className="bg-black text-white text-xs px-2 py-1 rounded">Trailer</button>
              <button className="bg-black text-white text-xs px-2 py-1 rounded">HD</button>
            </div>
            <p className="text-gray-700 mb-4">{movie.description}</p>

            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Released:</strong> {movie.year}</p>
              <p><strong>Genre:</strong> {movie.category}</p>
              <p><strong>Duration:</strong> {movie.duration || "N/A"}</p>
              <p><strong>Country:</strong> {movie.country || "N/A"}</p>
              <p><strong>Production:</strong> {movie.production || "N/A"}</p>
              <p><strong>Casts:</strong> {movie.casts || "N/A"}</p>
            </div>

            {/* seasons */}
            {movie.type === "TV Show" && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Sezoane</h2>
                <div className="flex gap-4 mb-4">
                  {movie.seasons.map((s, idx) => (
                    <button
                      key={s.season}
                      onClick={() => setSelectedSeason(idx)}
                      className={`px-3 py-1 rounded transition ${
                        idx === selectedSeason
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Sezonul {s.season}
                    </button>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-2">
                  Episoade - Sezonul {movie.seasons[selectedSeason].season}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {movie.seasons[selectedSeason].episodes.map((ep, i) => (
                    <Link
                      key={i}
                      to={`/video/${encodeURIComponent(movie.id)}/season/${selectedSeason}/episode/${i}`}
                      className="px-4 py-2 rounded-lg shadow bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white transition"
                    >
                      {ep.title || `Episodul ${i + 1}`}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* like / favorite */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => toggle("likes", setLiked, liked)}
                className={`px-4 py-1 rounded text-white transition ${
                  liked ? "bg-red-600" : "bg-blue-600"
                }`}
              >
                {liked ? "❤️ Liked" : "👍 Like"}
              </button>
              <button
                onClick={() => toggle("favorites", setFavorited, favorited)}
                className={`px-4 py-1 rounded border transition ${
                  favorited
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {favorited ? "⭐ Favorit" : "➕ Add to favorite"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
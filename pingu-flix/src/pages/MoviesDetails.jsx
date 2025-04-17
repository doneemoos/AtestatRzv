import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import movies from "../data/movies";
import Footer from "../components/footer";

/* 🔗 Firebase & context */
import { useAuth } from "../context/AuthContext";
import { addToList, removeFromList } from "../utils/db";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function MovieDetails() {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === decodeURIComponent(id));
  const user  = useAuth();

  /* starea butoanelor */
  const [liked,     setLiked] = useState(false);
  const [favorited, setFav]   = useState(false);

  /* când componenta sau user‑ul se schimbă, verificăm dacă filmul e deja salvat */
  useEffect(() => {
    if (!user || !movie) return;

    (async () => {
      const likeSnap = await getDoc(doc(db, "users", user.uid, "likes",      movie.id));
      const favSnap  = await getDoc(doc(db, "users", user.uid, "favorites", movie.id));
      setLiked(likeSnap.exists());
      setFav(favSnap.exists());
    })();
  }, [user, movie]);

  /* adaugă / scoate din colecția Firestore corespunzătoare */
  const toggle = async (listName, setter, state) => {
    if (!user) {
      alert("Trebuie să fii logat ca să folosești această funcție!");
      return;
    }
    state
      ? await removeFromList(user.uid, listName, movie.id)
      : await addToList   (user.uid, listName, movie);
    setter(!state);
  };

  /* -------- UI -------- */

  if (!movie) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center text-red-600">
        <h2>Filmul nu a fost găsit!</h2>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* fundal blur din poster */}
      <div
        className="absolute inset-0 h-96 bg-cover bg-center blur-sm brightness-50"
        style={{ backgroundImage: `url(${movie.posterUrl})` }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row p-6">
          {/* poster */}
          <div className="w-full md:w-1/4">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="rounded-lg shadow w-full object-cover"
            />
          </div>

          {/* detalii */}
          <div className="md:ml-8 mt-6 md:mt-0 flex-1">
            {/* watch now */}
            <Link
              to={
                movie.type === "TV Show"
                  ? `/video/${encodeURIComponent(movie.id)}/episode/0`
                  : `/video/${encodeURIComponent(movie.id)}`
              }
              className="bg-blue-600 text-white px-5 py-2 rounded-lg mb-4 inline-block"
            >
              ▶ Watch now
            </Link>

            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>

            <div className="flex items-center gap-2 mb-2">
              <button className="bg-black text-white text-xs px-2 py-1 rounded">
                Trailer
              </button>
              <button className="bg-black text-white text-xs px-2 py-1 rounded">
                HD
              </button>
              <span className="text-yellow-600 font-medium">
                IMDB: {movie.imdb || "N/A"}
              </span>
            </div>

            <p className="text-gray-700 mb-4">{movie.description}</p>

            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Released:</strong>   {movie.year}</p>
              <p><strong>Genre:</strong>      {movie.category}</p>
              <p><strong>Duration:</strong>   {movie.duration || "N/A"}</p>
              <p><strong>Country:</strong>    {movie.country   || "N/A"}</p>
              <p><strong>Production:</strong> {movie.production|| "N/A"}</p>
              <p><strong>Casts:</strong>      {movie.casts     || "N/A"}</p>
            </div>

            {/* episoade (doar la serial) */}
            {movie.type === "TV Show" && movie.episodes?.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Episoade</h2>
                <div className="flex flex-wrap gap-4">
                  {movie.episodes.map((ep, idx) => (
                    <Link
                      key={idx}
                      to={`/video/${encodeURIComponent(movie.id)}/episode/${idx}`}
                      className="px-4 py-2 rounded-lg shadow bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white transition"
                    >
                      {ep.title || `Episodul ${idx + 1}`}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* butoane like / favorite */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => toggle("likes", setLiked, liked)}
                className={`px-4 py-1 rounded text-white transition ${
                  liked ? "bg-red-600" : "bg-blue-600"
                }`}
              >
                {liked ? "❤️ Liked" : "👍 Like"}
              </button>

              <button
                onClick={() => toggle("favorites", setFav, favorited)}
                className={`px-4 py-1 rounded border transition ${
                  favorited
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {favorited ? "⭐ Favorit" : "➕ Add to favorite"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MovieDetails;

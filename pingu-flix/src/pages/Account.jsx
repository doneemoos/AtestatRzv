// src/pages/Account.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { subscribeToList } from "../utils/db";
import { Link } from "react-router-dom";

function Account() {
  const user = useAuth();
  const [favs, setFavs] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    if (!user) return;
    const unsubFavs = subscribeToList(user.uid, "favorites", setFavs);
    const unsubLikes = subscribeToList(user.uid, "likes", setLikes);
    return () => {
      unsubFavs();
      unsubLikes();
    };
  }, [user]);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Trebuie să te autentifici.</h1>
      </div>
    );

  const username = user.displayName || user.email.split("@")[0];

  return (
    <>
      {/* gradient page + card CSS */}
      <style>{`
        @property --middle-color {
          syntax: '<color>';
          initial-value: rgba(146,29,255,0.66);
          inherits: false;
        }
        .movieCard {
          --middle-color: rgba(146,29,255,0.66);
          background: linear-gradient(
            330deg,
            rgba(13,42,71,1) 0%,
            var(--middle-color) 50%,
            rgba(13,42,71,1) 98%
          );
          transition:
            --middle-color 1s ease,
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }
        .movieCard:hover {
          --middle-color: rgba(34,120,207,0.66);
        }
      `}</style>

      <div
        className="min-h-screen"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(20, 0, 70) 0%, rgb(40, 21, 100) 100%)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-10 text-gray-200">
          <h1 className="text-4xl font-bold mb-10">Salut, {username}! 👋</h1>

          <Section title="⭐ Favorite Movies" data={favs} />
          <Section title="❤️ Liked Movies" data={likes} />
        </div>
      </div>
    </>
  );
}

function Section({ title, data }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      {data.length === 0 ? (
        <p className="text-gray-400">Nimic aici încă…</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {data.map((m) => (
            <Link
              key={m.id}
              to={`/movies/${encodeURIComponent(m.id)}`}
              className="movieCard rounded-2xl p-2 shadow-md hover:shadow-lg hover:scale-105"
            >
              <img
                src={m.posterUrl}
                alt={m.title}
                className="w-full h-[20rem] object-cover rounded-lg"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Account;

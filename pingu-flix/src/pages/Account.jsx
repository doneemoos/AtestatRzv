import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { subscribeToList } from "../utils/db";
import { Link } from "react-router-dom";

function Account() {
  const user = useAuth();
  const [favs,  setFavs]  = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    if (!user) return;
    const u1 = subscribeToList(user.uid, "favorites", setFavs);
    const u2 = subscribeToList(user.uid, "likes",     setLikes);
    return () => { u1(); u2(); };
  }, [user]);

  if (!user)
    return <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl">Trebuie să te autentifici.</h1>
    </div>;

  const username = user.displayName || user.email.split("@")[0];

  const Section = ({ title, data }) => (
    <>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {data.length === 0
        ? <p className="text-gray-500 mb-8">Nimic aici încă…</p>
        : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 mb-10">
            {data.map(m => (
              <Link key={m.id} to={`/movies/${encodeURIComponent(m.id)}`}>
                <img
                  src={m.posterUrl}
                  alt={m.title}
                  className="rounded-lg shadow hover:scale-105 transition"
                />
              </Link>
            ))}
          </div>}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-4xl font-bold mb-10">Salut, {username}! 👋</h1>
      <Section title="⭐ Favorite Movies" data={favs} />
      <Section title="❤️ Liked Movies"    data={likes} />
    </div>
  );
}

export default Account;

import React from "react";
import { useParams } from "react-router-dom";
import movies from "../data/movies"; // Importă array-ul de filme


function VideoPlayer() {
  const { id } = useParams(); // Obține ID-ul filmului/serialului din URL
  const movie = movies.find((movie) => movie.id === parseInt(id)); // Găsește filmul/serialul după ID

  if (!movie) {
    return <div className="text-center mt-10 text-xl">Filmul sau serialul nu a fost găsit!</div>;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      {/* Titlul filmului/serialului */}
      <h1 className="text-4xl font-bold mb-6 text-center">{movie.title}</h1>

      {/* Player video */}
      <div className="mb-6">
        <video
          controls
          className="w-full rounded-lg shadow-lg"
          poster={movie.posterUrl || "https://via.placeholder.com/300x450"}
        >
          <source src={movie.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"} type="video/mp4" />
          Browserul tău nu suportă elementul video.
        </video>
      </div>

      {/* Detalii despre film/serial */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700 mb-4">{movie.description || "Descriere indisponibilă."}</p>
        <div className="flex flex-wrap gap-4 text-gray-600">
          <p>
            <strong>Categoria:</strong> {movie.category || "Necunoscută"}
          </p>
          <p>
            <strong>Anul lansării:</strong> {movie.year || "Necunoscut"}
          </p>
          <p>
            <strong>Durata:</strong> {movie.duration ? `${movie.duration} minute` : "Necunoscută"}
          </p>
        </div>
      </div>

      {/* Buton pentru revenire */}
      <div className="mt-6 text-center">
        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          ⬅ Înapoi
        </button>
      </div>
    </div>
  );
}

export default VideoPlayer;
// src/components/trending.jsx
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import movies from "../data/movies"; // Local movie list

function Tranding() {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const apiKey = "b824d3987acfe368a810569eb6ba6bdd"; // Replace with your TMDb key
  const isDragging = useRef(false);

  /* ---------------- Fetch TMDb popularity ---------------- */
  const fetchPopularity = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          movie.title
        )}`
      );
      const data = await response.json();
      if (data.results?.length) {
        const exactMatch = data.results.find(
          (r) => r.title.toLowerCase() === movie.title.toLowerCase()
        );
        const bestMatch = exactMatch || data.results[0];
        return bestMatch.popularity || 0;
      }
      return 0;
    } catch (err) {
      console.error(`Error fetching popularity for ${movie.title}:`, err);
      return 0;
    }
  };

  /* ---------------- Build trending list ---------------- */
  useEffect(() => {
    (async () => {
      try {
        const enriched = await Promise.all(
          movies.map(async (m) => ({ ...m, popularity: await fetchPopularity(m) }))
        );
        const sorted = enriched.sort((a, b) => b.popularity - a.popularity);
        setTrendingMovies(sorted.slice(0, 20));
      } catch (e) {
        console.error("Error fetching trending movies:", e);
      }
    })();
  }, [apiKey]);

  /* ---------------- Slider helpers ---------------- */
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const dragThreshold = 5; // threshold to detect actual drag

  const CARD_WIDTH_PX = 420; // ~ card (384) + gap (24‑32)
  const CARDS_TO_SCROLL = 3;
  const SCROLL_DELTA = CARD_WIDTH_PX * CARDS_TO_SCROLL; // ≈ 1260px

  const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  const animateScroll = (el, to, dur) => {
    const from = el.scrollLeft;
    const change = to - from;
    const start = performance.now();
    const step = (now) => {
      const prog = Math.min(1, (now - start) / dur);
      el.scrollLeft = from + change * easeInOutQuad(prog);
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const scrollLeft = () =>
    sliderRef.current &&
    animateScroll(sliderRef.current, sliderRef.current.scrollLeft - SCROLL_DELTA, 600);

  const scrollRight = () =>
    sliderRef.current &&
    animateScroll(sliderRef.current, sliderRef.current.scrollLeft + SCROLL_DELTA, 600);

  /* ---------------- Drag / touch handlers ---------------- */
  const onDown = (x) => {
    isDown.current = true;
    isDragging.current = false;
    startX.current = x - sliderRef.current.offsetLeft;
    scrollStart.current = sliderRef.current.scrollLeft;
  };
  const onMove = (x) => {
    if (!isDown.current) return;
    const walk = x - startX.current;
    if (Math.abs(walk) > dragThreshold) isDragging.current = true;
    sliderRef.current.scrollLeft = scrollStart.current - walk;
  };
  const onUp = () => (isDown.current = false);

  return (
    <section
      className="relative w-full py-8 px-4 overflow-hidden"
      style={{ background: "linear-gradient(90deg, #140046 0%, #281564 100%)" }}
    >
      {/* Reuse gradient button styles */}
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

      {/* Title shifted to the right (ml-32) */}
      <h2 className="text-white text-3xl font-bold mb-6 ml-[2rem]">Trending Movies</h2>

      <div className="relative flex items-center">
        {/* Scroll left button */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 z-10 bg-white text-black rounded-full p-2 shadow hover:scale-105 transition"
          aria-label="Scroll Left"
        >
          &#10094;
        </button>

        <div
          ref={sliderRef}
          className="flex space-x-6 px-6 overflow-hidden cursor-grab"
          onMouseDown={(e) => onDown(e.pageX)}
          onMouseLeave={onUp}
          onMouseUp={onUp}
          onMouseMove={(e) => onMove(e.pageX)}
          onTouchStart={(e) => onDown(e.touches[0].pageX)}
          onTouchMove={(e) => onMove(e.touches[0].pageX)}
          onTouchEnd={onUp}
        >
          {trendingMovies.length === 0 ? (
            <p className="text-white">Loading...</p>
          ) : (
            trendingMovies.map((movie) => (
              <div
                key={movie.id}
                className="flex-none w-96 py-4"
                onClick={() => {
                  if (!isDragging.current) navigate(`/movies/${movie.id}`);
                }}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="bg-[#190b3d] text-white rounded-xl shadow-lg h-[36rem] flex flex-col transform transition duration-200 ease-out hover:scale-105"
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    className="rounded-t-xl h-[20rem] w-full object-cover"
                  />
                  <div className="p-4 flex-1 overflow-hidden">
                    <h3 className="text-xl font-semibold mb-1 truncate">
                      {movie.title}
                    </h3>
                    <p
                      className="text-sm opacity-75 mb-2"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {movie.description}
                    </p>
                    <p className="text-sm opacity-75 mb-2">
                      <strong>Genre:</strong> {movie.category}
                    </p>
                    <p className="text-sm opacity-75 mb-2">
                      <strong>Year:</strong> {movie.year}
                    </p>
                    <p className="text-sm opacity-75 mb-2">
                      <strong>Type:</strong> {movie.type}
                    </p>
                    <p className="text-sm opacity-75 mb-2">
                      Popularity: {movie.popularity.toFixed(2)}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/movies/${movie.id}`);
                      }}
                      className="inline-flex items-center justify-center px-3 py-1 text-white text-[16px] rounded-[0.5rem] shadow-md signUpButton"
                    >
                      Discover
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Scroll right button */}
        <button
          onClick={scrollRight}
          className="absolute right-2 z-10 bg-white text-black rounded-full p-2 shadow hover:scale-105 transition"
          aria-label="Scroll Right"
        >
          &#10095;
        </button>
      </div>
    </section>
  );
}

export default Tranding;

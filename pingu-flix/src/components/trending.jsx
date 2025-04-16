import React, { useRef, useState, useEffect } from "react";
import movies from "../data/movies"; // Lista ta locală de filme

function Tranding() {
  const sliderRef = useRef(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const apiKey = "b824d3987acfe368a810569eb6ba6bdd"; // Înlocuiește cu cheia ta TMDb

  // Funcție care caută în TMDb un film după titlu și returnează popularitatea
  const fetchPopularity = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          movie.title
        )}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        // Caută o potrivire exactă pe titlu (ignoring case); dacă nu, folosește primul rezultat
        const exactMatch = data.results.find(
          (result) =>
            result.title.toLowerCase() === movie.title.toLowerCase()
        );
        const bestMatch = exactMatch || data.results[0];
        return bestMatch.popularity || 0;
      } else {
        return 0;
      }
    } catch (error) {
      console.error(`Error fetching popularity for ${movie.title}:`, error);
      return 0;
    }
  };

  // useEffect: pentru fiecare film din lista locală, se obține popularitatea din TMDb,
  // se sortează descrescător și se setează top 20 filme
  useEffect(() => {
    async function fetchTrendingData() {
      try {
        const moviesWithPopularity = await Promise.all(
          movies.map(async (movie) => {
            const popularity = await fetchPopularity(movie);
            return { ...movie, popularity };
          })
        );
        // Sortează filmele descrescător după popularitate
        const sortedMovies = moviesWithPopularity.sort(
          (a, b) => b.popularity - a.popularity
        );
        // Selectează primele 20
        setTrendingMovies(sortedMovies.slice(0, 20));
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    }
    fetchTrendingData();
  }, [apiKey]);

  // --- Funcționalitate slider: scroll smooth și drag ---

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  // Funcție de easing pentru o tranziție smooth
  const easeInOutQuad = (t) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  // Funcție pentru a anima scroll-ul folosind requestAnimationFrame
  const animateScroll = (element, to, duration) => {
    const start = element.scrollLeft;
    const change = to - start;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      let progress = elapsed / duration;
      if (progress > 1) progress = 1;
      const easeProgress = easeInOutQuad(progress);
      element.scrollLeft = start + change * easeProgress;
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      animateScroll(sliderRef.current, sliderRef.current.scrollLeft - 300, 600);
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      animateScroll(sliderRef.current, sliderRef.current.scrollLeft + 300, 600);
    }
  };

  // Handlers pentru drag pe desktop
  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftStart.current = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = x - startX.current;
    sliderRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  // Handlers pentru touch (mobile)
  const handleTouchStart = (e) => {
    isDown.current = true;
    startX.current = e.touches[0].pageX - sliderRef.current.offsetLeft;
    scrollLeftStart.current = sliderRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDown.current) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = x - startX.current;
    sliderRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleTouchEnd = () => {
    isDown.current = false;
  };

  return (
    <section
      className="relative w-full py-8 px-4 overflow-hidden"
      style={{ background: "linear-gradient(90deg, #140046 0%, #281564 100%)" }}
    >
      <h2 className="text-white text-3xl font-bold mb-6">Trending Movies</h2>
      <div className="relative flex items-center">
        {/* Buton scroll stânga */}
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
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {trendingMovies.length === 0 ? (
            <p className="text-white">Se încarcă...</p>
          ) : (
            trendingMovies.map((movie) => (
              <div key={movie.id} className="flex-none w-96 py-4">
                <div
                  className="bg-[#190b3d] text-white rounded-xl shadow-lg h-[36rem] flex flex-col transform transition duration-200 ease-out hover:scale-105"
                  style={{ transformOrigin: "center" }}
                >
                  {/* Folosim posterUrl din lista locală */}
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    className="rounded-t-xl h-64 w-full object-cover"
                  />
                  <div className="p-4 flex-1 overflow-hidden">
                    <h3 className="text-xl font-semibold mb-1">{movie.title}</h3>
                    <p className="text-sm opacity-75 mb-2">
                      {movie.description}
                    </p>
                    <p className="text-sm opacity-75 mb-2">
                      <strong>Gen:</strong> {movie.category}
                    </p>
                    <p className="text-sm opacity-75 mb-2">
                      <strong>An:</strong> {movie.year}
                    </p>
                    <p className="text-sm opacity-75 mb-2">
                      <strong>Tip:</strong> {movie.type}
                    </p>
                    <p className="text-sm opacity-75 mb-2">
                      Popularitate: {movie.popularity.toFixed(2)}
                    </p>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full text-sm">
                      Discover
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Buton scroll dreapta */}
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

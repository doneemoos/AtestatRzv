import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[oklch(10.1%_0.149_302.717)] w-full px-4 py-6">
      <div className="flex flex-wrap items-center justify-center w-full">
        
        {/* COL 1: Logo */}
        <div className="w-full sm:w-1/3 flex items-center justify-center mb-2 sm:mb-0">
          <Link to="/" className="text-white text-2xl font-bold">
            PinguFlix
          </Link>
        </div>

        {/* COL 2: Meniu (Movies, TvShows, Top100) */}
        <div className="w-full sm:w-1/3 flex items-center justify-center mb-2 sm:mb-0">
          <ul className="flex gap-8 items-center">
            <li>
              <Link className="text-white hover:underline" to="/Movies">
                Movies
              </Link>
            </li>
            <li>
              <Link className="text-white hover:underline" to="/Movies">
                TvShows
              </Link>
            </li>
            <li>
              <Link className="text-white hover:underline" to="/Movies">
                Top100
              </Link>
            </li>
          </ul>
        </div>

        {/* COL 3: Butoane (Log In, Sign Up) */}
        <div className="w-full sm:w-1/3 flex items-center justify-center">
          <Link className="text-white hover:underline mr-4" to="/Auth">
            Log In
          </Link>
          <Link className="text-white hover:underline" to="/Auth">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

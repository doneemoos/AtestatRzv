import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[oklch(10.1%_0.149_302.717)] w-full py-3 px-1  ">
      <div className="flex flex-wrap items-center w-full">
        
        {/* COL 1: Logo */}
        {/* 
          w-full => pe ecrane mici ocupă tot rândul (100%)
          sm:w-1/3 => de la 640px în sus ocupă 1/3
          flex justify-center => conținutul este centrat pe orizontală
          mb-2 => spațiu jos la ecrane mici, sm:mb-0 => scoate spațiul la ecrane mari
        */}
        <div className="w-full sm:w-1/3 flex justify-center mb-2 sm:mb-0">
          <Link to="/" className="text-white text-2xl font-bold">
            PinguFlix
          </Link>
        </div>

        {/* COL 2: Meniu principal (Movies, TvShows, Top100) */}
        {/* 
          Același pattern: 
          - 100% lățime pe ecrane mici (și devine un rând separat)
          - 1/3 la ecrane mari
          - conținutul centrat pe orizontală
        */}
        <div className="w-full sm:w-1/3 flex justify-center mb-2 sm:mb-0">
          <ul className="flex gap-10">
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
        <div className="w-full sm:w-1/3 flex justify-center">
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

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-gray-800">
      <div className="text-white text-2xl font-bold">
        <Link to="/">PinguFlix</Link>
      </div>
      <ul className="flex gap-6">
        <li>
          <Link className="text-white hover:underline" to="/Movies">
            Movies
          </Link>
        </li>
        <li>
          <Link className="text-white hover:underline" to="/Auth">
            Log In
          </Link>
        </li>
        <li>
          <Link className="text-white hover:underline" to="/Auth">
            Sing Up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

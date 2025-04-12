import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Referințe pentru video (desktop și mobile)
  const videoRefDesktop = useRef(null);
  const videoRefMobile = useRef(null);

  // Funcții pentru desktop
  const handleDesktopHoverEnter = () => {
    if (videoRefDesktop.current) {
      videoRefDesktop.current.play();
    }
  };

  const handleDesktopHoverLeave = () => {
    if (videoRefDesktop.current) {
      videoRefDesktop.current.pause();
      videoRefDesktop.current.currentTime = 0; // resetează la început
    }
  };

  // Funcții pentru mobil
  const handleMobileHoverEnter = () => {
    if (videoRefMobile.current) {
      videoRefMobile.current.play();
    }
  };

  const handleMobileHoverLeave = () => {
    if (videoRefMobile.current) {
      videoRefMobile.current.pause();
      videoRefMobile.current.currentTime = 0;
    }
  };

  return (
    <nav className="bg-[oklch(10.1%_0.149_302.717)] w-full px-8 py-2">
      {/* Layout pentru ecrane medii și mari */}
      <div className="hidden md:grid md:grid-cols-3 md:items-center">
        {/* Coloana stângă: Logo și video */}
        <div className="flex items-center justify-start">
          <video
            ref={videoRefDesktop}
            className="LogoVideo h-[100px]"
            muted
            playsInline
          >
            <source src="/LogoPinguF.mov" type='video/mp4; codecs="hvcl"' />
            <source src="/LogoPinguF.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <Link
            to="/"
            className="text-white text-2xl font-bold ml-2"
            onMouseEnter={handleDesktopHoverEnter}
            onMouseLeave={handleDesktopHoverLeave}
          >
            PinguFlix
          </Link>
        </div>

        {/* Coloana centrală: Linkurile de navigație */}
        <div className="flex items-center justify-center">
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

        {/* Coloana dreaptă: Butoanele pentru Log In și Sign Up */}
        <div className="flex items-center justify-end">
          <Link className="text-white hover:underline mr-4" to="/Auth">
            Log In
          </Link>
          <Link className="text-white hover:underline" to="/Auth">
            Sign Up
          </Link>
        </div>
      </div>

      {/* Layout pentru ecrane mici / mobile */}
      <div className="md:hidden flex flex-col items-center space-y-2">
        <div className="flex items-center justify-center">
          <video
            ref={videoRefMobile}
            className="LogoVideo h-[100px]"
            muted
            playsInline
          >
            <source src="/LogoPinguF.mov" type='video/mp4; codecs="hvcl"' />
            <source src="/LogoPinguF.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <Link
            to="/"
            className="text-white text-2xl font-bold ml-2"
            onMouseEnter={handleMobileHoverEnter}
            onMouseLeave={handleMobileHoverLeave}
          >
            PinguFlix
          </Link>
        </div>
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
        <div className="flex items-center">
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

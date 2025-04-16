import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const videoRefDesktop = useRef(null);
  const videoRefMobile = useRef(null);

  /* ---------------- Desktop hover handlers ---------------- */
  const handleDesktopHoverEnter = () => {
    videoRefDesktop.current?.play();
  };

  const handleDesktopHoverLeave = () => {
    if (videoRefDesktop.current) {
      videoRefDesktop.current.pause();
      videoRefDesktop.current.currentTime = 0;
    }
  };

  /* ---------------- Mobile hover handlers ---------------- */
  const handleMobileHoverEnter = () => {
    videoRefMobile.current?.play();
  };

  const handleMobileHoverLeave = () => {
    if (videoRefMobile.current) {
      videoRefMobile.current.pause();
      videoRefMobile.current.currentTime = 0;
    }
  };

  return (
    <>
      {/*
        Style block — înregistrăm Poppins Regular 400 și îl aplicăm
        link‑urilor și butoanelor din navbar
      */}
      <style>{`
        /* --- Font registration: Poppins Regular 400 --- */
        @font-face {
          font-family: 'Poppins';
          src: url('/Poppins-Regular.ttf') format('truetype');
          font-weight: 400;
          font-stretch: normal;
          font-style: normal;
          font-display: swap;
        }

        /* --- Navigation links --- */
        .navLink {
          font-family: 'Poppins', sans-serif;
          font-size: 23px;
          font-weight: 400;
        }

        /* --- Animated gradient auth button --- */
        @property --middle-color {
          syntax: '<color>';
          initial-value: rgba(146, 29, 255, 0.66);
          inherits: false;
        }
        .logInButton {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          background: linear-gradient(
            330deg,
            rgba(13, 42, 71, 1) 0%,
            var(--middle-color) 50%,
            rgba(13, 42, 71, 1) 98%
          );
          font-size: 23px;
          transition: --middle-color 1s ease;
        }
        .logInButton:hover {
          --middle-color: rgba(34, 120, 207, 0.66);
        }
      `}</style>

      <nav
        className="relative w-full px-8 py-2 min-h-[10vh] border-b-[0.2px] border-white z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(13, 7, 48) 1%, rgb(15, 0, 63) 100%)",
          filter:
            'progid:DXImageTransform.Microsoft.gradient( startColorstr="#360049", endColorstr="#170073", GradientType=1 )',
        }}
      >
        {/* -------- Desktop layout -------- */}
        <div className="hidden md:grid md:grid-cols-3 md:items-center">
          {/* Left column: logo & brand */}
          <div className="flex items-center justify-start">
            <video
              ref={videoRefDesktop}
              className="LogoVideo h-[85px]"
              muted
              playsInline
            >
              <source src="/LogoPinguF.mov" type='video/mp4; codecs="hvcl"' />
              <source src="/LogoPinguF.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
            <Link
              to="/"
              style={{ fontFamily: "'Cinzel Decorative', serif" }}
              className="text-white text-3xl font-bold ml-2"
              onMouseEnter={handleDesktopHoverEnter}
              onMouseLeave={handleDesktopHoverLeave}
            >
              PenguFlix
            </Link>
          </div>

          {/* Center column: navigation links */}
          <div className="flex items-center justify-center">
            <ul className="flex gap-8 items-center">
              <li>
                <Link className="text-white hover:underline navLink" to="/Movies">
                  Movies
                </Link>
              </li>
              <li>
                <Link className="text-white hover:underline navLink" to="/Movies">
                  TvShows
                </Link>
              </li>
              <li>
                <Link className="text-white hover:underline navLink" to="/Movies">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Right column: auth button */}
          <div className="flex items-center justify-end">
            <Link
              to="/Auth"
              className="inline-flex items-center justify-center px-4 py-2 text-white text-[24px] rounded-[0.8rem] shadow-md logInButton"
            >
              LOG IN
            </Link>
          </div>
        </div>

        {/* -------- Mobile layout -------- */}
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
              style={{ fontFamily: "'Cinzel Decorative', serif" }}
              className="text-white text-3xl font-bold ml-2"
              onMouseEnter={handleMobileHoverEnter}
              onMouseLeave={handleMobileHoverLeave}
            >
              PinguFlix
            </Link>
          </div>
          <ul className="flex gap-8 items-center">
            <li>
              <Link className="text-white hover:underline navLink" to="/Movies">
                Movies
              </Link>
            </li>
            <li>
              <Link className="text-white hover:underline navLink" to="/Movies">
                TvShows
              </Link>
            </li>
            <li>
              <Link className="text-white hover:underline navLink" to="/Movies">
                My Account
              </Link>
            </li>
          </ul>
          <div className="flex items-center">
            <Link
              to="/Auth"
              className="inline-flex items-center justify-center px-4 py-2 text-white text-[24px] rounded-[1rem] shadow-md logInButton"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

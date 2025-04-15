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
      videoRefDesktop.current.currentTime = 0;
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
    <>
      {/* Bloc de stiluri pentru proprietatea @property și animația butonului "Sign Up" */}
      <style>{`
        @property --middle-color {
          syntax: '<color>';
          initial-value: rgba(146, 29, 255, 0.66);
          inherits: false;
        }
        .signUpButton {
          background: linear-gradient(
            330deg,
            rgba(13, 42, 71, 1) 0%,
            var(--middle-color) 50%,
            rgba(13, 42, 71, 1) 98%
          );
          transition: --middle-color 1s ease;
        }
        .signUpButton:hover {
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
        {/* Layout pentru ecrane medii și mari */}
        <div className="hidden md:grid md:grid-cols-3 md:items-center">
          {/* Coloana stângă: Logo și video */}
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
              className="text-white text-2xl font-bold ml-2"
              onMouseEnter={handleDesktopHoverEnter}
              onMouseLeave={handleDesktopHoverLeave}
            >
              PenguFlix
            </Link>
          </div>

          {/* Coloana centrală: Linkurile de navigație */}
          <div className="flex items-center justify-center">
            <ul className="flex gap-8 items-center">
              <li>
                <Link
                  className="text-white hover:underline text-[20px]"
                  to="/Movies"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  className="text-white hover:underline text-[20px]"
                  to="/Movies"
                >
                  TvShows
                </Link>
              </li>
              <li>
                <Link
                  className="text-white hover:underline text-[20px]"
                  to="/Movies"
                >
                  Top100
                </Link>
              </li>
            </ul>
          </div>

          {/* Coloana dreaptă: Butoanele pentru Log In și Sign Up */}
          <div className="flex items-center justify-end">
           
            
            
            {/* Buton "Sign Up" care folosește clasa signUpButton pentru a anima gradientul */}
            <Link
              to="/Auth"
              className="
                inline-flex
                items-center
                justify-center
                px-4 py-2
                text-white
                text-[20px]
                rounded-[0.8rem]
                shadow-md
                signUpButton
              "
            >
              LOG IN
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
              style={{ fontFamily: "'Cinzel Decorative', serif" }}
              className="text-white text-2xl font-bold ml-2"
              onMouseEnter={handleMobileHoverEnter}
              onMouseLeave={handleMobileHoverLeave}
            >
              PinguFlix
            </Link>
          </div>
          <ul className="flex gap-8 items-center">
            <li>
              <Link
                className="text-white hover:underline text-[20px]"
                to="/Movies"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                className="text-white hover:underline text-[20px]"
                to="/Movies"
              >
                TvShows
              </Link>
            </li>
            <li>
              <Link
                className="text-white hover:underline text-[20px]"
                to="/Movies"
              >
                Top100
              </Link>
            </li>
          </ul>
          <div className="flex items-center">
            
            {/* Separator vertical */}
            <div className="border-l-[1px] border-white h-6 mx-3" />
            {/* Buton "Sign Up" pentru mobile */}
            <Link
              to="/Auth"
              className="
                inline-flex
                items-center
                justify-center
                px-4 py-2
                text-white
                text-[20px]
                rounded-[1rem]
                shadow-md
                signUpButton
              "
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

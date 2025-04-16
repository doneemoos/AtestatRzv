// ----------------------------------------------
// Navbar.jsx                                   |
// ----------------------------------------------
import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const videoRefDesktop = useRef(null);
  const videoRefMobile = useRef(null);

  const play = (ref) => ref.current?.play();
  const reset = (ref) => {
    if (ref.current) {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  };

  return (
    <>
      <style>{`
        @font-face { font-family: 'Poppins'; src: url('/Poppins-Regular.ttf') format('truetype'); font-weight: 400; font-display: swap; }
        .navLink { font-family: 'Poppins', sans-serif; font-size: 23px; }
        @property --middle-color { syntax: '<color>'; initial-value: rgba(146,29,255,0.66); inherits: false; }
        .logInButton { font-family: 'Poppins', sans-serif; font-size: 23px; background: linear-gradient(330deg, rgba(13,42,71,1) 0%, var(--middle-color) 50%, rgba(13,42,71,1) 98%); transition: --middle-color 1s ease; }
        .logInButton:hover { --middle-color: rgba(34,120,207,0.66); }
      `}</style>

      <nav className="relative w-full px-8 py-2 min-h-[10vh] border-b-[0.2px] border-white z-[1]" style={{ backgroundImage: "linear-gradient(90deg,#0d0730 1%,#0f003f 100%)" }}>
        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-3 md:items-center">
          <div className="flex items-center">
            <video ref={videoRefDesktop} className="LogoVideo h-[85px]" muted playsInline>
              <source src="/LogoPinguF.mov" type='video/mp4; codecs="hvcl"' />
              <source src="/LogoPinguF.webm" type="video/webm" />
            </video>
            <Link to="/" style={{ fontFamily: "'Cinzel Decorative', serif" }} className="text-white text-3xl font-bold ml-2" onMouseEnter={() => play(videoRefDesktop)} onMouseLeave={() => reset(videoRefDesktop)}>
              PenguFlix
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <ul className="flex gap-8 items-center">
              <li><Link className="text-white hover:underline navLink" to="/Movies?type=movies">Movies</Link></li>
              <li><Link className="text-white hover:underline navLink" to="/Movies?type=tv">TvShows</Link></li>
              <li><Link className="text-white hover:underline navLink" to="/Movies">My Account</Link></li>
            </ul>
          </div>
          <div className="flex items-center justify-end"><Link to="/Auth" className="inline-flex items-center justify-center px-4 py-2 text-white rounded-[0.8rem] shadow-md logInButton">LOG IN</Link></div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col items-center space-y-2">
          <div className="flex items-center justify-center">
            <video ref={videoRefMobile} className="LogoVideo h-[100px]" muted playsInline>
              <source src="/LogoPinguF.mov" type='video/mp4; codecs="hvcl"' />
              <source src="/LogoPinguF.webm" type="video/webm" />
            </video>
            <Link to="/" style={{ fontFamily: "'Cinzel Decorative', serif" }} className="text-white text-3xl font-bold ml-2" onMouseEnter={() => play(videoRefMobile)} onMouseLeave={() => reset(videoRefMobile)}>
              PinguFlix
            </Link>
          </div>
          <ul className="flex gap-8 items-center">
            <li><Link className="text-white hover:underline navLink" to="/Movies?type=movies">Movies</Link></li>
            <li><Link className="text-white hover:underline navLink" to="/Movies?type=tv">TvShows</Link></li>
            <li><Link className="text-white hover:underline navLink" to="/Movies">My Account</Link></li>
          </ul>
          <div className="flex items-center"><Link to="/Auth" className="inline-flex items-center justify-center px-4 py-2 text-white rounded-[1rem] shadow-md logInButton">Sign Up</Link></div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
// src/components/footer.jsx
import React, { useRef } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const videoRef = useRef(null);

  return (
    <footer className="bg-[#190B3D] text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <video
                ref={videoRef}
                className="LogoVideo h-[3rem]"
                muted
                playsInline
              >
                <source src="/LogoPinguF.mov" type="video/mp4; codecs='hvcl'" />
                <source src="/LogoPinguF.webm" type="video/webm" />
              </video>
              <Link to="/" className="ml-2 text-xl font-bold">
                PenguFlix
              </Link>
            </div>
            <p className="text-gray-400">
              Building innovative solutions for the modern world.
            </p>
            {/* Social icons remain unchanged */}
            <div className="flex space-x-4">{/* ...icons... */}</div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/Movies?type=movies"
                  className="text-gray-400 hover:text-white transition"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/Movies?type=tv"
                  className="text-gray-400 hover:text-white transition"
                >
                  TV Shows
                </Link>
              </li>
              <li>
                <Link
                  to="/Account"
                  className="text-gray-400 hover:text-white transition"
                >
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">Movie Provider</span>
              </li>
              <li>
                <span className="text-gray-400">TV Show Provider</span>
              </li>
              <li>
                <span className="text-gray-400">Best Quality Videos</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <address className="not-italic text-gray-400 space-y-1">
              <p>Pengu Street</p>
              <p>United States, CA 88832</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:contact@penguflix.com"
                  className="hover:text-white transition"
                >
                  contact@penguflix.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+40746959390"
                  className="hover:text-white transition"
                >
                  +40&nbsp;746&nbsp;959&nbsp;390
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 PenguFlix. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

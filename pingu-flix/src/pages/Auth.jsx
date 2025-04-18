import React, { useState, useEffect } from "react";
import { auth } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "";
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let cred;
      if (isLogin) {
        cred = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        if (!cred.user.displayName && formData.name) {
          await updateProfile(cred.user, {
            displayName: formData.name,
          });
        }
        console.log("Logged in user:", cred.user);
      } else {
        cred = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        await updateProfile(cred.user, {
          displayName: formData.name,
        });
        console.log("Registered user:", cred.user);
      }
      navigate("/", {
        state: {
          message: `Welcome, ${
            formData.name || cred.user.displayName || cred.user.email
          }!`,
        },
      });
    } catch (err) {
      console.error("Authentication error:", err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      navigate("/", {
        state: { message: `Welcome, ${result.user.displayName}!` },
      });
    } catch (err) {
      console.error("Google Error:", err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Error signing out:", err.message);
    }
  };

  // Bkg
  const wrapperClass =
    "relative flex items-center overflow-hidden h-screen justify-center w-screen min-h-[125vh] min-pt-[10vh] bg-gradient-to-r from-[#010b12]/100 to-[#010b12]/100";

  if (user) {
    return (
      <div className={wrapperClass}>
        {/* Background image */}
        <img
          src="/abstract-blurred-background-light-leaks.jpg"
          alt="Background"
          fetchPriority="high"
          loading="eager"
          className="
              absolute inset-0 
              w-full h-full 
              object-cover 
              opacity-60 
              transform rotate-180 
              pointer-events-none 
              z-0
            "
        />

        {/* Content */}
        <div
          className="
              relative z-10 
              flex items-center justify-center 
              font-poppins 
              bg-[#190B3D]/50 
              w-full h-full
            "
        >
          <div className="text-center px-4">
            <h2 className="text-3xl sm:text-4xl mb-6 text-white drop-shadow-lg">
              Welcome, {user.displayName || "User"}!
            </h2>
            <button
              onClick={handleLogout}
              className="
                  bg-gradient-to-r from-red-500 to-pink-500 
                  shadow-xl 
                  px-8 py-3 
                  text-white 
                  rounded-full 
                  text-lg 
                  transform hover:scale-105 
                  transition
                "
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <img
        src="/abstract-blurred-background-light-leaks.jpg"
        alt="Background"
        fetchPriority="high"
        loading="eager"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60 transform rotate-180"
      />

      <div className="relative z-10 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl p-4 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-[30px]">
        <div className="border-[25px] border-transparent rounded-[30px] bg-[#190B3D]/50 backdrop-blur-lg shadow-lg w-full p-8">
          <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {isLogin ? "Log In" : "Sign Up"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-lg md:text-xl text-white"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full p-4 border border-white rounded-lg shadow placeholder:text-base md:placeholder:text-lg focus:scale-105 transition duration-300 ease-in-out bg-transparent text-white"
                  placeholder="Name"
                />
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-lg md:text-xl text-white"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-4 border border-white rounded-lg shadow placeholder:text-base md:placeholder:text-lg focus:scale-105 transition duration-300 ease-in-out bg-transparent text-gray-100"
                placeholder="Email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-lg md:text-xl text-white"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-4 border border-white rounded-lg shadow placeholder:text-base md:placeholder:text-lg focus:scale-105 transition duration-300 ease-in-out bg-transparent text-white"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 text-lg md:text-xl font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow hover:scale-105 transition"
            >
              {isLogin ? "LOG IN" : "SIGN UP"}
            </button>
          </form>

          <div className="flex flex-col items-center justify-center mt-8 text-base md:text-lg">
            <span className="text-gray-300">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <div>
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ name: "", email: "", password: "" });
                }}
                className="mt-2 text-blue-300 underline hover:text-blue-400 transition text-base md:text-lg"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </div>

            <div className="flex w-full max-w-md justify-center space-x-4 mt-12">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition"
              >
                <img
                  src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                  alt="Google"
                  className="w-6 h-6"
                />
              </button>

              <button className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition">
                <img
                  src="https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/"
                  alt="Apple"
                  className="w-6 h-6"
                />
              </button>

              <button className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition">
                <img
                  src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
                  alt="GitHub"
                  className="w-6 h-6 bg-white rounded-full"
                />
              </button>

              <button className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition">
                <img
                  src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
                  alt="Twitter"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;

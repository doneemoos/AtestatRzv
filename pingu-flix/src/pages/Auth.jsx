import React, { useState, useEffect } from "react";
import { auth } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        console.log("Utilizator logat:", userCredential.user);
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        console.log("Utilizator înregistrat:", userCredential.user);
      }
      navigate("/", {
        state: { message: `Bine ai venit, ${formData.name || "utilizator"}!` },
      });
    } catch (error) {
      console.error("Eroare:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Autentificat cu Google:", user);
      navigate("/", {
        state: { message: `Bine ai venit, ${user.displayName || "utilizator"}!` },
      });
    } catch (error) {
      console.error("Eroare la autentificarea cu Google:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Eroare la delogare:", error.message);
    }
  };

  if (user) {
    return (
      <div className="flex font-poppins items-center justify-center dark:bg-gray-900 min-w-screen min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl mb-4 dark:text-gray-400">
            Bine ai venit, {user.displayName || user.email}!
          </h2>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 shadow-lg p-4 text-white rounded-lg text-xl hover:scale-105 hover:from-pink-500 hover:to-red-500 transition duration-300 ease-in-out"
          >
            Deconectare
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex font-poppins items-center justify-center dark:bg-gray-900 min-w-screen min-h-screen">
      <div className="grid gap-8">
        <div
          id="back-div"
          className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[30px] mx-auto max-w-[1100px] p-4"
        >
          <div className="border-[25px] border-transparent rounded-[30px] dark:bg-gray-900 bg-white shadow-lg xl:p-12 2xl:p-12 lg:p-12 md:p-10 sm:p-6 m-4 max-w-[1000px] mx-auto">
            <h1 className="pt-10 pb-8 font-bold text-6xl dark:text-gray-400 text-center cursor-default">
              {isLogin ? "Log In" : "Sign Up"}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label
                    htmlFor="name"
                    className="mb-3 dark:text-gray-400 text-xl"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="border dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 p-4 shadow-md placeholder:text-lg border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required={!isLogin}
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="mb-3 dark:text-gray-400 text-xl"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 p-4 shadow-md placeholder:text-lg border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-3 dark:text-gray-400 text-xl"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="border dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 p-4 mb-3 shadow-md placeholder:text-lg border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-8 p-4 text-white rounded-lg w-full text-xl hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              >
                {isLogin ? "LOG IN" : "SIGN UP"}
              </button>
            </form>
            <div className="flex flex-col mt-6 items-center justify-center text-lg">
              <h3>
                <span className="cursor-default dark:text-gray-300">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </span>
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setFormData({ name: "", email: "", password: "" });
                  }}
                  className="group text-blue-400 transition-all duration-100 ease-in-out ml-2 underline"
                >
                  {isLogin ? "Sign Up" : "Log In"}
                </button>
              </h3>
            </div>
            <div
              id="third-party-auth"
              className="flex items-center justify-center mt-8 flex-wrap"
            >
              <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-3 rounded-lg m-2">
                <img
                  className="max-w-[30px]"
                  src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                  alt="Google"
                />
              </button>
              <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-3 rounded-lg m-2">
                <img
                  className="max-w-[30px]"
                  src="https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/"
                  alt="Apple"
                />
              </button>
              <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-3 rounded-lg m-2">
                <img
                  className="max-w-[30px] bg-white rounded-full"
                  src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
                  alt="GitHub"
                />
              </button>
              <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-3 rounded-lg m-2">
                <img
                  className="max-w-[30px]"
                  src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
                  alt="Twitter"
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
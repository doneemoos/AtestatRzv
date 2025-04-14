// client/src/pages/Auth.jsx
import React, { useState } from "react";
import { auth } from "../firebase"; // Corect: Fișierul firebase.js este în directorul src
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Hook pentru navigare

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
        // Login cu Firebase
        userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        console.log("Utilizator logat:", userCredential.user);
      } else {
        // Sign up cu Firebase
        userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        console.log("Utilizator înregistrat:", userCredential.user);
      }

      // Redirecționează către pagina principală și afișează mesajul de bun venit
      navigate("/", { state: { message: `Bine ai venit, ${userCredential.user.email}!` } });
    } catch (error) {
      console.error("Eroare:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Utilizator deconectat.");
      navigate("/auth"); // Redirecționează utilizatorul către pagina de autentificare
    } catch (error) {
      console.error("Eroare la deconectare:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">
        {isLogin ? "Log In" : "Sign Up"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border px-3 py-2 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border px-3 py-2 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          {isLogin ? "Log In" : "Sign Up"}
        </button>
      </form>

      <div className="mt-4">
        {isLogin ? (
          <p>
            Nu ai cont?
            <button
              onClick={() => setIsLogin(false)}
              className="text-blue-600 ml-1 underline"
            >
              Crează unul
            </button>
          </p>
        ) : (
          <p>
            Deja ai cont?
            <button
              onClick={() => setIsLogin(true)}
              className="text-blue-600 ml-1 underline"
            >
              Loghează-te
            </button>
          </p>
        )}
      </div>

      {/* Buton de Log Out */}
      <div className="mt-6 text-center">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Auth;

// client/src/pages/Auth.jsx
import React, { useState } from 'react';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin 
      ? 'http://localhost:5000/api/auth/login' 
      : 'http://localhost:5000/api/auth/register';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log('Răspuns server:', data);
      // tratezi succesul sau eroarea
    } catch (error) {
      console.error('Eroare:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">
        {isLogin ? 'Log In' : 'Sign Up'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              className="w-full border px-3 py-2 rounded"
              onChange={handleChange}
              required={!isLogin}
            />
          </div>
        )}
        
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
          {isLogin ? 'Log In' : 'Sign Up'}
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
    </div>
  );
}

export default Auth;

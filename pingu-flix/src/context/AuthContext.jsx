// src/context/AuthContext.jsx
import {
  createContext, useContext, useEffect, useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  return (
    <AuthCtx.Provider value={user}>
      {children}
    </AuthCtx.Provider>
  );
}

// src/context/AuthContext.js
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      setUser({ email: data.email, name: data.name });
    }
    return data;
  };

  const register = async (email, password, name) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    let data = null;
    try {
      data = await res.json();
    } catch {}
    if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
    return res.json();
  };

  const fetchMe = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, fetchMe, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

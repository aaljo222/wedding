import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthCtx = createContext(null);
const LS_KEY = "auth_token";
const LS_USER = "auth_user";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(LS_KEY) || "");
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(LS_USER);
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (token) localStorage.setItem(LS_KEY, token);
    else localStorage.removeItem(LS_KEY);
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem(LS_USER, JSON.stringify(user));
    else localStorage.removeItem(LS_USER);
  }, [user]);

  const login = async ({ email, password }) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "login failed");
    setToken(data.token);
    setUser(data.user);
  };

  const register = async ({ name, email, password }) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "register failed");
    // 회원가입 후 자동 로그인 원하면 아래 호출
    await login({ email, password });
  };

  const logout = () => {
    setToken("");
    setUser(null);
  };

  const value = useMemo(
    () => ({ token, user, login, register, logout }),
    [token, user]
  );
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);

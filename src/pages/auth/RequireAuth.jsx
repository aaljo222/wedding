// src/features/auth/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";

export default function RequireAuth({ children }) {
  const { user } = useAuth();
  const loc = useLocation();
  if (!user)
    return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  return children;
}

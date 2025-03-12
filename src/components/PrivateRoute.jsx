import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user } = useAuth();

  // Si no hay usuario autenticado, redirigir al login
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

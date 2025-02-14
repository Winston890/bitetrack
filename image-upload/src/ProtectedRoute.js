import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "react-oidc-context";

const ProtectedRoute = () => {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

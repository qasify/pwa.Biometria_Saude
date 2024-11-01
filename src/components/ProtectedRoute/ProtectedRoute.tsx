import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../authentication/AuthProvider";

const ProtectedRoute: React.FC = () => {
  const { authenticatedUser } = useAuth();

  if (!authenticatedUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

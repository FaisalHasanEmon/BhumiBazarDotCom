import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const LoginSignupRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading, setLoading } = useAuth();

  if (loading) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  if (!user) {
    return children;
  }
  return <Navigate state={location.pathname} to="/" replace></Navigate>;
};

export default LoginSignupRoute;

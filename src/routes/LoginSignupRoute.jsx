import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Shared/Loadingbar/Loading";

const LoginSignupRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading, setLoading } = useAuth();

  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return children;
  }
  return <Navigate state={location.pathname} to="/" replace></Navigate>;
};

export default LoginSignupRoute;

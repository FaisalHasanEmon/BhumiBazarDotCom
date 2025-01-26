import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location?.pathname} to="/login" replace></Navigate>;
};

export default PrivateRoute;

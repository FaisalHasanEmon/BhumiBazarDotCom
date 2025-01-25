import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import userUserInfo from "../hooks/userUserInfo";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading, setLoading } = useAuth();
  const [userInfo, isUserPending] = userUserInfo();
  if (loading || isUserPending) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  if (user && userInfo?.role == "admin") {
    setLoading(false);
    return children;
  }
  return <Navigate state={location.pathname} to="/" replace></Navigate>;
};

export default AdminRoute;

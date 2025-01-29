import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import userUserInfo from "../hooks/userUserInfo";
import Loading from "../components/Shared/Loadingbar/Loading";

const UserRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading, setLoading } = useAuth();
  const [userInfo, isUserPending] = userUserInfo();
  if (loading || isUserPending) {
    return <Loading></Loading>;
  }

  if (user && userInfo?.role == "user") {
    setLoading(false);
    return children;
  }
  return <Navigate state={location.pathname} to="/" replace></Navigate>;
};

export default UserRoute;

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AllProperties from "../pages/AllProperties/AllProperties";
import Login from "../pages/Auth/Login/Login";
import SignUp from "../pages/Auth/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import LoginSignupRoute from "./LoginSignupRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import Agent from "../pages/Dashboard/Agent/Agent";
import Admin from "../pages/Dashboard/Admin/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "allproperties",
        element: <AllProperties></AllProperties>,
      },
      {
        path: "login",
        element: (
          <LoginSignupRoute>
            <Login></Login>
          </LoginSignupRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <LoginSignupRoute>
            <SignUp></SignUp>
          </LoginSignupRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard/",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "agent",
        element: <Agent></Agent>,
      },
      {
        path: "admin",
        element: <Admin></Admin>,
      },
    ],
  },
]);

export default router;

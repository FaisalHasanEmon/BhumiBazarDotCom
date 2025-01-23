import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AllProperties from "../pages/AllProperties/AllProperties";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import Login from "../pages/Auth/Login/Login";
import SignUp from "../pages/Auth/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import LoginSignupRoute from "./LoginSignupRoute";

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
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
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
        element: <SignUp></SignUp>,
        // (
        //   <LoginSignupRoute>
        //     <SignUp></SignUp>
        //   </LoginSignupRoute>
        // ),
      },
    ],
  },
]);

export default router;

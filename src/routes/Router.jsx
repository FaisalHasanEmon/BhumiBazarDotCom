import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AllProperties from "../pages/AllProperties/AllProperties";
import Login from "../pages/Auth/Login/Login";
import SignUp from "../pages/Auth/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import LoginSignupRoute from "./LoginSignupRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Dashboard/Dashboard/Profile";
import MyReviews from "../pages/Dashboard/User/MyReviews";
import Wishlist from "../pages/Dashboard/User/Wishlist";
import PropertyBought from "../pages/Dashboard/User/PropertyBought";
import AddProperty from "../pages/Dashboard/Agent/AddProperty";
import AddedProperty from "../pages/Dashboard/Agent/AddedProperty";
import SoldProperties from "../pages/Dashboard/Agent/SoldProperties";
import RequestedProperties from "../pages/Dashboard/Agent/RequestedProperties";
import ManageProperties from "../pages/Dashboard/Admin/ManageProperties";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageReviews from "../pages/Dashboard/Admin/ManageReviews";
import AgentRoute from "./AgentRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import PropertyDetails from "../pages/PropertyDetails/PropertyDetails";
import useAxiosSecure from "../hooks/useAxiosSecure";
import serverDomain from "../hooks/serverDomain";
import UpdateProperty from "../pages/Dashboard/Agent/UpdateProperty";
import MakeOffer from "../pages/Dashboard/PaymentPage/MakeOffer";

const axiosSecure = useAxiosSecure();

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
        element: (
          <PrivateRoute>
            <AllProperties></AllProperties>
          </PrivateRoute>
        ),
      },
      {
        path: "propertyDetails/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails></PropertyDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${serverDomain}/propertyDetails/${params.id}`),
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
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "my-reviews",
        element: (
          <UserRoute>
            <MyReviews></MyReviews>
          </UserRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <UserRoute>
            <Wishlist></Wishlist>
          </UserRoute>
        ),
      },
      {
        path: "/dashboard/wishlist/make-offer/:id",
        element: (
          <UserRoute>
            <MakeOffer></MakeOffer>
          </UserRoute>
        ),
        loader: ({ params }) =>
          fetch(`${serverDomain}/propertyWishlist/${params.id}`),
      },
      {
        path: "property-bought",
        element: (
          <UserRoute>
            <PropertyBought></PropertyBought>
          </UserRoute>
        ),
      },
      {
        path: "add-property",
        element: (
          <AgentRoute>
            <AddProperty></AddProperty>
          </AgentRoute>
        ),
      },
      {
        path: "update-property/:id",
        element: (
          <AgentRoute>
            <UpdateProperty></UpdateProperty>
          </AgentRoute>
        ),
        loader: ({ params }) =>
          fetch(`${serverDomain}/propertyDetails/${params.id}`),
      },
      {
        path: "added-property",
        element: (
          <AgentRoute>
            <AddedProperty></AddedProperty>
          </AgentRoute>
        ),
      },
      {
        path: "sold-properties",
        element: (
          <AgentRoute>
            <SoldProperties></SoldProperties>
          </AgentRoute>
        ),
      },
      {
        path: "requested-properties",
        element: (
          <AgentRoute>
            <RequestedProperties></RequestedProperties>
          </AgentRoute>
        ),
      },
      {
        path: "manage-properties",
        element: (
          <AdminRoute>
            <ManageProperties></ManageProperties>
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manage-reviews",
        element: (
          <AdminRoute>
            <ManageReviews></ManageReviews>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;

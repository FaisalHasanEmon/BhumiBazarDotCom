import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Shared/Footer/Footer";
import Navbar from "../components/Shared/Navbar/Navbar";

const MainLayout = () => {
  const location = useLocation();
  let showNavFooter =
    (location.pathname === "/login") | (location.pathname === "/signup")
      ? true
      : false;

  return (
    <div className="container mx-auto px-5">
      {showNavFooter || <Navbar></Navbar>}
      <div className="min-h-[calc(100vh-278px)] ">
        <Outlet></Outlet>
      </div>
      {showNavFooter || <Footer></Footer>}
    </div>
  );
};
export default MainLayout;

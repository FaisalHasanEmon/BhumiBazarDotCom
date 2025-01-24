import { Outlet } from "react-router-dom";
import DashboardMenu from "../components/Shared/DashboardMenu/DashboardMenu";

const DashboardLayout = () => {
  return (
    <div className="container grid grid-cols-12 gap-0 ">
      <DashboardMenu></DashboardMenu>
      <div className="col-span-12 md:col-span-10  ">
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 h-7 bg-black text-white">
          User DashBoard
        </div>
        <div className="col-span-12 md:col-span-10  ">
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 h-7 bg-black text-white">
            User DashBoard
          </div>
          <div className="mt-10 md:mt-7">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

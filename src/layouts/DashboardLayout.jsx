import { Outlet } from "react-router-dom";
import DashboardMenu from "../components/Shared/DashboardMenu/DashboardMenu";

const DashboardLayout = () => {
  return (
    <div className="container grid grid-cols-12 gap-0 ">
      <DashboardMenu></DashboardMenu>

      <div className="col-span-12 md:col-span-9 lg:col-span-10  pl-4">
        <div className="mt-10 md:mt-7">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

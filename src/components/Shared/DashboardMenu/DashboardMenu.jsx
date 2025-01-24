import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const DashboardMenu = () => {
  const { user, logout, name } = useAuth();
  const tabs = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allproperties">All Properties</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="admin">Admin</NavLink>
          </li>
          <li>
            <NavLink to="agent">Agent</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="bg-base-200 lg:bg-white col-span-0 md:col-span-2  md:drawer-open   ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content  flex flex-col items-start justify-start">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="bg-slate-400 w-5 flex justify-center items-center h-10 rounded-tr-lg rounded-br-lg drawer-button fixed hi-  md:hidden"
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </label>
      </div>
      <div className="drawer-side z-10 ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-6/12 md:w-full p-4">
          {/* Sidebar content here */}
          {tabs}
        </ul>
      </div>
    </div>
  );
};

export default DashboardMenu;

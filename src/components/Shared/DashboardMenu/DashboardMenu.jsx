import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import userUserInfo from "../../../hooks/userUserInfo";
import useProperty from "../../../hooks/useProperty";

const DashboardMenu = () => {
  const { user, logout, name } = useAuth();
  const [userInfo, isUserPending] = userUserInfo();

  const tabs = (
    <>
      <li>
        <NavLink to="/" className="lg:text-xl font-bold">
          BhumiBazarDotCom
        </NavLink>
      </li>
      <div className="divider"></div>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allproperties">All Properties</NavLink>
      </li>

      <div className="divider"></div>
      {user && (
        <>
          <li>
            <NavLink to="profile">My Profile</NavLink>
          </li>
          {userInfo?.role === "user" && (
            <>
              <li>
                <NavLink to="wishlist">Wishlist</NavLink>
              </li>
              <li>
                <NavLink to="property-bought">Property Bought</NavLink>
              </li>
              <li>
                <NavLink to="my-reviews">My Reviews</NavLink>
              </li>
            </>
          )}
          {userInfo?.role === "agent" && (
            <>
              <li>
                <NavLink to="add-property">Add Property</NavLink>
              </li>
              <li>
                <NavLink to="added-property">Added properties</NavLink>
              </li>
              <li>
                <NavLink to="sold-properties">Sold Properties</NavLink>
              </li>
              <li>
                <NavLink to="requested-properties">
                  Requested Properties
                </NavLink>
              </li>
            </>
          )}
          {userInfo?.role === "admin" && (
            <>
              <li>
                <NavLink to="manage-properties">Manage Properties</NavLink>
              </li>
              <li>
                <NavLink to="manage-users">Manage Users</NavLink>
              </li>
              <li>
                <NavLink to="manage-reviews">Manage Reviews</NavLink>
              </li>
            </>
          )}
        </>
      )}
    </>
  );
  return (
    <div className="bg-base-200 lg:bg-white col-span-0 md:col-span-3 lg:col-span-2  md:drawer-open   ">
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

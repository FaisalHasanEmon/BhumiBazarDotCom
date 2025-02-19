import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logout, name } = useAuth();

  const handleLogout = () => {
    logout();
  };
  const tabs = (
    <>
      <li>
        <NavLink to="">Home</NavLink>
      </li>
      <li>
        <NavLink to="allproperties">All Properties</NavLink>
      </li>
      <li>
        <NavLink to="about-us">About Us</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/dashboard/profile">Dashboard</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-10 fixed top-0 mx-auto left-0 z-50 md:px-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {tabs}
          </ul>
        </div>
        <Link to="/" className="btn btn-sm text-lg md:text-2xl font-bold">
          BhumiBazar
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{tabs}</ul>
      </div>
      <div className="navbar-end flex gap-3">
        {user?.email ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className=" m-1">
              <figure className="w-12 h-12 md:w-14 md:h-14 border-2 border-gray-300 rounded-full overflow-clip">
                <img
                  src={user?.photoURL}
                  className="h-full w-full object-cover "
                  alt="Profile"
                />
              </figure>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <p className="border-2 border-gray-400 bg-gray-400 text-white font-bold hover:bg-gray-400 hover:text-white">
                  {user?.displayName}
                </p>
              </li>
              <li className="mt-1">
                <button
                  className="font-bold border-2 border-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="login">
              <button className="btn">Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

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
    <div className="navbar bg-base-100">
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
        <Link to="/" className="btn btn-ghost text-2xl font-bold">
          BhumiBazarDotCom
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{tabs}</ul>
      </div>
      <div className="navbar-end flex gap-3">
        {user?.email ? (
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="login">Login</Link>
            <Link to="signup">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

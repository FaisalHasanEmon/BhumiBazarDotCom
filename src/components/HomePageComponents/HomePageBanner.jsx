import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link, Links } from "react-router-dom";

const HomePageBanner = () => {
  const { user } = useAuth();
  return (
    <div
      className="hero min-h-[450px] rounded-lg"
      style={{
        backgroundImage: "url(homepagebanner.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="w-8/12">
          <h1 className="mb-5 text-4xl text-white font-extrabold">
            Welcome to BhumiBazar
          </h1>
          <p className="mb-5 text-2xl text-white font-bold">
            Explore a world of houses, lands, and properties designed to fit
            your needs and desires.
          </p>
          {user ? (
            <>
              <button className="btn border-2  shadow-md shadow-white border-white bg-transparent text-white font-semibold text-2xl">
                <Link to="/allproperties"> Get Started</Link>
              </button>
            </>
          ) : (
            <>
              <button className="btn border-2  shadow-md shadow-white border-white bg-transparent text-white font-semibold text-2xl">
                <Link to="/login">Login</Link>{" "}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePageBanner;

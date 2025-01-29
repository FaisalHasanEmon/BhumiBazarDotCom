import React from "react";
import DashboardPageHeading from "../../../components/Shared/DashboardPageHeading/DashboardPageHeading";

const SoldProperties = () => {
  return (
    <div>
      <DashboardPageHeading
        heading={"My Sold Properties"}
      ></DashboardPageHeading>
      <div className="divider"></div>
      <DashboardPageHeading
        heading={"You have not sold any properties yet!"}
      ></DashboardPageHeading>
    </div>
  );
};

export default SoldProperties;

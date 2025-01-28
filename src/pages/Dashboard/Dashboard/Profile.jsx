import React from "react";
import userUserInfo from "../../../hooks/userUserInfo";
import DashboardPageHeading from "../../../components/Shared/DashboardPageHeading/DashboardPageHeading";
import { FaRegIdBadge, FaRegIdCard } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoMdTime } from "react-icons/io";

const Profile = () => {
  const [userInfo, isUserPending] = userUserInfo();
  console.log(userInfo);
  if (isUserPending) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <DashboardPageHeading heading={"User Profile"}></DashboardPageHeading>
      <div className="divider"></div>
      <figure className="w-[250px] h-[250px] lg:w-[450px] lg:h-[450px] border-2 border-gray-300 rounded-badge overflow-clip">
        <img
          src={userInfo?.photo}
          className="w-full h-full object-cover"
          alt="User Photo"
        />
      </figure>
      <div className="space-y-3 *:text-xl *:font-bold *:flex *:gap-1 *:justify-start *:items-center mt-5">
        <p>
          <FaRegIdBadge />

          <span>Name: {userInfo?.name}</span>
          {userInfo?.fraud === true && (
            <span className="ml-7 bg-red-500 p-1 rounded-lg text-white">
              Marked As Fraud
            </span>
          )}
        </p>
        <p>
          <MdOutlineMailOutline />
          Email: {userInfo?.email}
        </p>
        <p>
          <FaRegIdCard />
          Role: {userInfo?.role}
        </p>
        <p>
          <IoMdTime /> Account Creation Date: {userInfo?.creationTime}
        </p>
      </div>
    </div>
  );
};

export default Profile;

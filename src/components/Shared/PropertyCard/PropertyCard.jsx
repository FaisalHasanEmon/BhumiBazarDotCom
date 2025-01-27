import React from "react";
import { FaBangladeshiTakaSign, FaLocationDot } from "react-icons/fa6";
import {
  MdOutlineEmail,
  MdOutlinePermIdentity,
  MdOutlineSubtitles,
} from "react-icons/md";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <div className="card card-compact bg-base-100  shadow-xl">
      <figure className="overflow-clip lg:h-[307px]">
        <img
          src={property?.propertyImage}
          alt="Properties"
          className="w-full lg:h-full lg:object-cover "
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">
            <MdOutlineSubtitles />
            {property?.propertyTitle}
          </h2>
          <div>
            {(property?.verificationStatus).toLowerCase() === "verified" && (
              <h2 className="border p-1 rounded-[10px] bg-green-500 text-white font-bold">
                {property?.verificationStatus}
              </h2>
            )}
            {(property?.verificationStatus).toLowerCase() === "pending" && (
              <h2 className="border p-1 rounded-[10px] bg-yellow-500 text-white font-bold">
                {property?.verificationStatus}
              </h2>
            )}
            {(property?.verificationStatus).toLowerCase() === "rejected" && (
              <h2 className="border p-1 rounded-[10px] bg-red-500 text-white font-bold">
                {property?.verificationStatus}
              </h2>
            )}
          </div>
        </div>

        <p className="card-title text-lg font-medium gap-1">
          <FaLocationDot />
          {property?.propertyLocation}
        </p>
        <p className="card-title text-lg font-medium gap-1">
          <FaBangladeshiTakaSign />
          Price Range : {property?.priceRange.minPrice}-
          {property?.priceRange.maxPrice}TK
        </p>
        <div className="divider my-1"></div>
        <p className="text-base font-bold">Agent Information</p>
        <div className="flex justify-start items-center gap-3">
          <figure>
            <img
              src={property?.agentImage}
              className="w-12 h-12 rounded-2xl object-cover"
              alt="Agent "
            />
          </figure>
          <div className="text-base font-medium">
            <p className="flex justify-start items-center gap-1">
              <MdOutlinePermIdentity />
              Name: {property?.agentName}
            </p>
            <p className="flex justify-start items-center gap-1">
              <MdOutlineEmail />
              Email: {property?.agentEmail}
            </p>
          </div>
        </div>

        <div className="card-actions justify-end">
          <Link to={`/propertyDetails/${property?._id}`}>
            <button className="btn border-2 border-blue-600 hover:border-orange-600">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

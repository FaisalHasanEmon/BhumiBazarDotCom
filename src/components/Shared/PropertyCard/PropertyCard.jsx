import React from "react";
import { FaBangladeshiTakaSign, FaLocationDot } from "react-icons/fa6";
import {
  MdOutlineEmail,
  MdOutlinePermIdentity,
  MdOutlineSubtitles,
} from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useWishlist from "../../../hooks/useWishlist";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PropertyCard = ({ property, from = "none" }) => {
  const [, , refetchWishlist] = useWishlist();
  const axiosSecure = useAxiosSecure();

  // Delete Selected Wishlist Data
  const handleDeleteWishedItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this property from wishlist!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/wishedItem/${id}`);
        refetchWishlist();
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "One review has deleted.",
            icon: "success",
          });
        }
      }
    });
  };
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
          {from === "agent" && (
            <button
              disabled={
                (property?.verificationStatus).toLowerCase() === "rejected"
                  ? true
                  : false
              }
              className="btn border-2 border-blue-600 hover:border-orange-600"
            >
              <Link to={`/dashboard/update-property/${property?._id}`}>
                Update Property
              </Link>
            </button>
          )}
          {from === "none" && (
            <Link to={`/propertyDetails/${property?._id}`}>
              <button className="btn border-2 border-blue-600 hover:border-orange-600">
                Details
              </button>
            </Link>
          )}
          {from === "user" && (
            <div className="flex gap-1 justify-center items-center">
              <button
                onClick={() => handleDeleteWishedItem(property?._id)}
                className="btn border-2 border-red-600 hover:border-orange-600"
              >
                Delete
              </button>
              <Link to={`/dashboard/wishlist/make-offer/${property._id}`}>
                <button className="btn border-2 border-blue-600 hover:border-orange-600">
                  Make An Offer
                </button>
              </Link>
            </div>
          )}
          {from === "propertyBought" && (
            <div className="flex gap-1 justify-center items-center">
              {(property?.agentValidation).toLowerCase() === "pending" && (
                <div className="btn bg-yellow-500 text-white font-bold">
                  Pending
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

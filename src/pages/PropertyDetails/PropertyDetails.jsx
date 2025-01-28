import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import userUserInfo from "../../hooks/userUserInfo";
import {
  FaBangladeshiTakaSign,
  FaLocationDot,
  FaRegFaceGrinHearts,
} from "react-icons/fa6";
import {
  MdOutlineEmail,
  MdOutlinePermIdentity,
  MdOutlineRateReview,
  MdOutlineSubtitles,
} from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import getFormattedDate from "../../utils/utilities";
import useTheme from "../../hooks/useTheme";
import useReviews from "../../hooks/useReviews";
import { IoIosStar } from "react-icons/io";
import { Rating } from "@smastrom/react-rating";
import useWishlist from "../../hooks/useWishlist";

const PropertyDetails = () => {
  // Use States
  const [review, setReview] = useState(""); // State to hold the review input
  const [rating, setRating] = useState(0); // State to hold the selected rating
  const [hoveredRating, setHoveredRating] = useState(0); // State for hover effect
  const [userInfo, isUserPending] = userUserInfo();
  const propertyDetails = useLoaderData();
  const { notifySuccess } = useTheme();
  const [userReviews, isReviewsLoading, refetchReviews] = useReviews();
  const axiosSecure = useAxiosSecure();
  const [wishlistData, isWishlistLoading, refetchWishlist] = useWishlist();
  const navigate = useNavigate();

  if (isUserPending || isReviewsLoading || isWishlistLoading) {
    return <p>Loading... User Info</p>;
  }

  const getWishlistUser = wishlistData?.filter(
    (item) => item?.propertyId === propertyDetails?._id
  );

  const handleAddToWishList = async () => {
    const {
      email: userEmail,
      name: userName,
      photo: userPhoto,
      role: userRole,
      _id: userId,
    } = userInfo;

    const {
      _id: propertyId,
      propertyImage: propertyImage,
      propertyTitle: propertyTitle,
      propertyLocation: propertyLocation,
      agentName: agentName,
      agentImage: agentImage,
      verificationStatus: verificationStatus,
      priceRange: priceRange,
      agentEmail: agentEmail,
    } = propertyDetails;

    const wishItem = {
      userEmail,
      userName,
      userPhoto,
      userRole,
      userId,
      propertyId,
      propertyImage,
      propertyTitle,
      propertyLocation,
      agentName,
      agentImage,
      verificationStatus,
      priceRange,
      agentEmail,
    };
    // console.log(wishItem);
    const res = await axiosSecure.post("/propertyWishlist", wishItem);
    // console.log(res.data);
    if (res.data.insertedId) {
      refetchWishlist();
      notifySuccess("Property Added To Wishlist");
      navigate("/dashboard/wishlist");
    }
  };

  // Review
  const handleSubmit = () => {
    const date = getFormattedDate();

    setReview(""); // Reset the review input
    setRating(0); // Reset the rating

    const userReview = {
      review: review,
      rating: rating,
      reviewerId: userInfo?._id,
      reviewerName: userInfo?.name,
      reviewerEmail: userInfo?.email,
      reviewerRole: userInfo?.role,
      reviewerPhoto: userInfo?.photo,
      reviewDate: date,
      propertyId: propertyDetails?._id,
      agentEmail: propertyDetails?.agentEmail,
    };

    axiosSecure.post("/reviews", userReview).then((res) => {
      if (res.data.acknowledged) {
        notifySuccess("Review Submitted");
        refetchReviews();
      }
    });

    document.getElementById("my_modal_1").close(); // Close the modal
  };

  const handleCancel = () => {
    setReview(""); // Reset the review input
    setRating(0); // Reset the rating
    document.getElementById("my_modal_1").close(); // Close the modal
  };
  const currentPropertyReviews = userReviews?.filter(
    (item) => item.propertyId === propertyDetails._id
  );

  return (
    <div>
      {/* Property Details Caption */}
      <h1 className="text-center text-3xl font-bold my-3">Property Details</h1>
      {/* Property Details Section Starts */}
      <div className="flex flex-col gap-5 lg:flex-row *:border ">
        {/* Property Image Section Starts */}
        <figure className="overflow-clip lg:h-[450px] rounded-lg">
          <img
            src={propertyDetails?.propertyImage}
            alt="Properties"
            className="w-full lg:h-full lg:object-cover "
          />
        </figure>
        {/* Property Image Section Ends */}

        {/* Property Details Starts */}
        <div className="card-body lg:justify-between bg-slate-200 rounded-lg">
          <div>
            <div>
              <div className="flex justify-between items-center">
                <h2 className="card-title justify-start items-baseline">
                  <MdOutlineSubtitles />
                  {propertyDetails?.propertyTitle}
                </h2>
                <div>
                  {propertyDetails?.verificationStatus?.toLowerCase() ===
                    "verified" && (
                    <h2 className="border p-1 rounded-[10px] bg-green-500 text-white font-bold">
                      {propertyDetails?.verificationStatus}
                    </h2>
                  )}
                  {(propertyDetails?.verificationStatus).toLowerCase() ===
                    "pending" && (
                    <h2 className="border p-1 rounded-[10px] bg-yellow-500 text-white font-bold">
                      {propertyDetails?.verificationStatus}
                    </h2>
                  )}
                  {(propertyDetails?.verificationStatus).toLowerCase() ===
                    "rejected" && (
                    <h2 className="border p-1 rounded-[10px] bg-red-500 text-white font-bold">
                      {propertyDetails?.verificationStatus}
                    </h2>
                  )}
                </div>
              </div>

              <p className="card-title text-lg font-medium gap-1">
                <FaLocationDot />
                {propertyDetails?.propertyLocation}
              </p>
              <p className="card-title text-lg font-medium gap-1">
                <FaBangladeshiTakaSign />
                Price Range : {propertyDetails?.priceRange.minPrice}-
                {propertyDetails?.priceRange.maxPrice}TK
              </p>
            </div>

            <div className="divider my-1"></div>
            <div className="space-y-2">
              <p className="text-base font-bold">Agent Information</p>
              <div className="flex justify-start items-center gap-3">
                <figure>
                  <img
                    src={propertyDetails?.agentImage}
                    className="w-12 h-12 rounded-2xl object-cover"
                    alt="Agent "
                  />
                </figure>
                <div className="text-base font-medium">
                  <p className="flex justify-start items-center gap-1">
                    <MdOutlinePermIdentity />
                    Name: {propertyDetails?.agentName}
                  </p>
                  <p className="flex justify-start items-center gap-1">
                    <MdOutlineEmail />
                    Email: {propertyDetails?.agentEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex gap-1">
            <button
              // disabled={userInfo.role.toLowerCase() === "user" ? false : true}
              disabled={
                userInfo.role.toLowerCase() === "user" &&
                getWishlistUser.length === 0
                  ? false
                  : true
              }
              className="btn border-2 border-green-500 font-bold flex"
              onClick={handleAddToWishList}
            >
              <FaRegFaceGrinHearts />
              Add To Wishlist
            </button>
            <button
              onClick={() => document.getElementById("my_modal_1").showModal()}
              className="btn border-2 border-blue-500 font-bold flex"
            >
              <MdOutlineRateReview />
              Add A Review
            </button>
          </div>
        </div>
        {/* Property Details Ends */}
      </div>
      {/* Property Details Section Ends */}

      {/* Review Section Starts*/}
      <div className="lg:w-6/12  mt-5 h-96 border-2 border-green-500 rounded-lg overflow-y-scroll mb-5 p-2">
        <p className="text-center font-bold text-lg">User Reviews</p>
        {currentPropertyReviews.length === 0 ? (
          <>
            <h1 className="flex justify-center items-center text-xl font-bold">
              No Reviews
            </h1>
          </>
        ) : (
          <>
            {currentPropertyReviews?.map((review) => (
              <div
                key={review._id}
                className="flex gap-1 border justify-between border-black rounded-xl my-1 p-1"
              >
                <div className="flex gap-2">
                  <figure className="w-12 h-12 rounded-xl border overflow-clip">
                    <img
                      src={review?.reviewerPhoto}
                      className="object-cover h-full w-full"
                      alt="Photo"
                    />
                  </figure>
                  <div>
                    <div className="flex gap-5 text-base">
                      <p className="flex gap-1 font-bold">
                        {review?.reviewerName}
                      </p>
                      <p className="flex justify-center items-center  font-bold">
                        <Rating
                          style={{ maxWidth: 100 }}
                          value={review.rating}
                          readOnly
                        />
                      </p>
                    </div>
                    <p>{review?.review}</p>
                  </div>
                </div>
                <div>
                  <p>{review?.reviewDate}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {/* Review Section Ends*/}

      {/* Modal Starts*/}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Submit Your Review</h3>
          <p className="py-4">
            We value your feedback. Please leave a review below:
          </p>

          {/* Star Rating */}
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                fill={
                  hoveredRating >= star || rating >= star ? "gold" : "white"
                }
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8 cursor-pointer"
                onMouseEnter={() => setHoveredRating(star)} // Highlight stars on hover
                onMouseLeave={() => setHoveredRating(0)} // Reset highlight on mouse leave
                onClick={() => setRating(star)} // Set the rating on click
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
            ))}
          </div>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Enter your review here"
            className="input input-bordered w-full"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          {/* Modal Actions */}
          <div className="modal-action">
            {/* Submit Button */}
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>

            {/* Cancel Button */}
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>
      {/* Modal Starts*/}
    </div>
  );
};

export default PropertyDetails;

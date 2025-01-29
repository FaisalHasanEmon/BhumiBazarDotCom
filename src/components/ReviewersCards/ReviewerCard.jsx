import React from "react";
import { FaHouse, FaIdBadge } from "react-icons/fa6";
import { MdDeleteForever, MdOutlineEmail } from "react-icons/md";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useReviews from "../../hooks/useReviews";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { IoMdTime } from "react-icons/io";
import useProperty from "../../hooks/useProperty";
const ReviewerCard = ({ review, from = "none" }) => {
  const [properties, isPropertyLoading] = useProperty();
  const [, , refetchReviews] = useReviews();
  const axiosSecure = useAxiosSecure();
  if (isPropertyLoading) {
    return <div>Loading...</div>;
  }
  const handleDeleteReview = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/reviews/${id}`);
        refetchReviews();
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

  const myReviewProperty = properties?.find(
    (property) => property?._id === review?.propertyId
  );
  console.log(myReviewProperty);
  return (
    <div className="border-2 border-gray-500 p-2 rounded-lg ">
      <div className="flex justify-between">
        <div className="flex gap-2 flex-wrap">
          <figure className="h-20 w-20 overflow-clip border-2 rounded-lg">
            <img
              src={review?.reviewerPhoto}
              className="object-cover h-full w-full"
              alt="Reviewer"
            />
          </figure>
          <div className="flex flex-col flex-wrap justify-start items-start">
            {from === "user" && (
              <p className="flex gap-1 text-blue-500 justify-start items-center text-base font-bold">
                <FaHouse />
                {myReviewProperty?.propertyTitle}
              </p>
            )}
            <p className="flex gap-1 justify-start items-center text-base font-bold">
              <FaIdBadge />
              {review?.reviewerName}
            </p>
            <p className="flex gap-1 justify-start items-center text-base font-bold">
              <MdOutlineEmail />
              {review?.reviewerEmail}
            </p>
            <p className="flex gap-1 justify-start items-center text-base font-bold">
              <IoMdTime />
              {review?.reviewDate}
            </p>
          </div>
        </div>
        <div className="text-4xl flex justify-center items-center">
          <button onClick={() => handleDeleteReview(review?._id)}>
            <MdDeleteForever color="red" />
          </button>
        </div>
      </div>
      <div className="divider"></div>
      <div className="space-y-2">
        <p>
          <Rating style={{ maxWidth: 100 }} value={review.rating} readOnly />
        </p>
        <p className="bg-gray-300 p-2 rounded-lg">{review.review}</p>
      </div>
    </div>
  );
};

export default ReviewerCard;

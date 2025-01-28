import React from "react";
import useReviews from "../../../hooks/useReviews";
import DashboardPageHeading from "../../../components/Shared/DashboardPageHeading/DashboardPageHeading";
import ReviewerCard from "../../../components/ReviewersCards/ReviewerCard";

const ManageReviews = () => {
  const [userReviews, isReviewsLoading, refetchReviews] = useReviews();
  if (isReviewsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DashboardPageHeading heading={"Manage Reviews"}></DashboardPageHeading>
      <div className="divider"></div>
      <div className=" space-y-2 pr-2">
        {userReviews?.map((review) => (
          <ReviewerCard key={review?._id} review={review}></ReviewerCard>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;

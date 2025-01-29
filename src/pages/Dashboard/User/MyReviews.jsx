import React from "react";
import useReviews from "../../../hooks/useReviews";
import DashboardPageHeading from "../../../components/Shared/DashboardPageHeading/DashboardPageHeading";
import ReviewerCard from "../../../components/ReviewersCards/ReviewerCard";
import userUserInfo from "../../../hooks/userUserInfo";
import Loading from "../../../components/Shared/Loadingbar/Loading";

const MyReviews = () => {
  const [userReviews, isReviewsLoading, refetchReviews] = useReviews();
  const [userInfo, isUserPending] = userUserInfo();
  if (isReviewsLoading || isUserPending) {
    return <Loading></Loading>;
  }
  const myReviews = userReviews?.filter(
    (review) => review.reviewerEmail === userInfo.email
  );
  const from = "user";
  return (
    <div>
      <DashboardPageHeading heading={"Manage Reviews"}></DashboardPageHeading>
      <div className="divider"></div>
      {myReviews.length === 0 ? (
        <>
          <DashboardPageHeading
            heading={"You've reviewed any property yet!"}
          ></DashboardPageHeading>
        </>
      ) : (
        <>
          <div className=" space-y-2 pr-2">
            {myReviews?.map((review) => (
              <ReviewerCard
                key={review?._id}
                review={review}
                from={from}
              ></ReviewerCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyReviews;

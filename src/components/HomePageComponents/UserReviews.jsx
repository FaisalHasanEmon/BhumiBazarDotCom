import { Rating } from "@smastrom/react-rating";
import useReviews from "../../hooks/useReviews";

const UserReviews = () => {
  const [userReviews, isReviewsLoading, refetchReviews] = useReviews();
  if (isReviewsLoading) {
    return <div>Loading...</div>;
  }
  const advertisingReview1 = userReviews?.filter(
    (review) => review?._id === "679a206b3a63cf888e91ecdd"
  );
  const advertisingReview2 = userReviews?.filter(
    (review) => review?._id === "679a21c73a63cf888e91ecde"
  );
  const advertisingReview3 = userReviews?.filter(
    (review) => review?._id === "679a2262377fa232b4d8349f"
  );
  const adReview = [
    ...advertisingReview1,
    ...advertisingReview2,
    ...advertisingReview3,
  ];

  return (
    <div className="flex flex-col md:flex-row gap-2 justify-center items-center ">
      {adReview?.map((review) => (
        <div key={review?._id} className="relative">
          <figure className="w-[300px] h-[300px] overflow-clip border rounded-lg">
            <img
              src={review?.reviewerPhoto}
              className="object-cover h-full w-full"
            ></img>
          </figure>
          <div className="rounded-lg backdrop-blur-md bg-white/30 h-[100px] w-1/2 md:w-[200px] absolute bottom-5 md:translate-x-12 translate-x-1/2 p-2 flex flex-col justify-center items-center gap-1 ">
            <Rating style={{ maxWidth: 100 }} value={review.rating} readOnly />
            <p className="text-xs text-gray font-semibold">{review?.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserReviews;

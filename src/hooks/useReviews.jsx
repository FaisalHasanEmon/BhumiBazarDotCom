import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useReviews = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: userReviews,
    isLoading: isReviewsLoading,
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ["UserReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });
  return [userReviews, isReviewsLoading, refetchReviews];
};

export default useReviews;

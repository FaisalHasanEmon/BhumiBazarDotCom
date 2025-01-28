import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useWishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    refetch: refetchWishlist,
    data: wishlistData,
    isLoading: isWishlistLoading,
  } = useQuery({
    queryKey: ["propertyWishlist"],
    queryFn: async () => {
      const res = await axiosSecure.get("/propertyWishlist");
      return res?.data;
    },
  });
  return [wishlistData, isWishlistLoading, refetchWishlist];
};

export default useWishlist;

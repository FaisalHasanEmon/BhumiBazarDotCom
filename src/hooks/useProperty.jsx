import useAuth from "./useAuth";
import { useQueries, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useProperty = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    refetch: refetchProperty,
    data: properties,
    isLoading: isPropertyLoading,
  } = useQuery({
    queryKey: ["getProperties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties");
      return res?.data;
    },
  });
  return [properties, isPropertyLoading, refetchProperty];
};

export default useProperty;

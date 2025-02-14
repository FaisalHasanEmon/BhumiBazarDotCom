import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useProperty = (location = "") => {
  // Accept location as a parameter
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    refetch: refetchProperty,
    data: properties,
    isLoading: isPropertyLoading,
  } = useQuery({
    queryKey: ["getProperties", user?.email, location], // Include location in queryKey
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties?location=${location}`);
      return res?.data;
    },
  });
  console.log(location);
  return [properties, isPropertyLoading, refetchProperty];
};

export default useProperty;

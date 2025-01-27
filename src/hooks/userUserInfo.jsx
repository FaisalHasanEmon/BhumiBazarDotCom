import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const userUserInfo = () => {
  const { user } = useAuth();
  // const [userInfo, setUserInfo] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { data: userInfo, isLoading: isUserPending } = useQuery({
    queryKey: [user?.email, "userInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });
  return [userInfo, isUserPending];
};

export default userUserInfo;

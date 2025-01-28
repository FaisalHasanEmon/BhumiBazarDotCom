import axios from "axios";
import serverDomain from "./serverDomain";

const axiosSecure = axios.create({
  baseURL: serverDomain,
});
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;

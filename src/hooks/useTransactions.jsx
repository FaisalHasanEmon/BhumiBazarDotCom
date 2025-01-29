import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useTransactions = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    refetch: refetchTransactions,
  } = useQuery({
    queryKey: ["Transactions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/propertyTransactions");
      return res.data;
    },
  });
  return [transactions, isTransactionsLoading, refetchTransactions];
};

export default useTransactions;

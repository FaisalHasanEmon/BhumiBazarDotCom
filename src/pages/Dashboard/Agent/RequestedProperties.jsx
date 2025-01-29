import React from "react";
import useTransactions from "../../../hooks/useTransactions";
import DashboardPageHeading from "../../../components/Shared/DashboardPageHeading/DashboardPageHeading";
import userUserInfo from "../../../hooks/userUserInfo";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTheme from "../../../hooks/useTheme";
import Loading from "../../../components/Shared/Loadingbar/Loading";
const RequestedProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { notifySuccess } = useTheme();
  const [transactions, isTransactionsLoading, refetchTransactions] =
    useTransactions();
  // Get current user info
  const [userInfo, isUserPending] = userUserInfo();

  if (isTransactionsLoading) {
    return <Loading></Loading>;
  }

  // Get my transaction information
  const myTransactions = transactions?.filter(
    (item) => item?.agentEmail === userInfo.email
  );
  console.log(myTransactions);

  // Handle Accept to pay
  const handleAccept = async (transactionId, propertyId) => {
    console.log(transactionId, propertyId);
    const res = await axiosSecure.put("/transaction-accept", {
      transactionId,
      propertyId,
    });
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      notifySuccess("Offer Accepted");
      refetchTransactions();
    }
  };
  const handleReject = async (id) => {
    console.log(id);
    const res = await axiosSecure.patch("/transaction-reject", { id });
    if (res.data.modifiedCount > 0) {
      notifySuccess("Offer Rejected");
      refetchTransactions();
    }
  };
  return (
    <div>
      <DashboardPageHeading
        heading={"Offered Properties"}
      ></DashboardPageHeading>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-xl text-black font-semibold">Agent Info</th>
              <th className="text-xl text-black font-semibold">Buyer's Info</th>
              <th className="text-xl text-black font-semibold">
                Offered Price
              </th>
              <th className="text-xl text-black font-semibold">Deadline</th>
              <th className="text-xl text-black font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myTransactions.map((property) => (
              <tr key={property?._id}>
                {/* Agent Info */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={property?.propertyImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{property?.propertyTitle}</div>
                      <div className="text-sm opacity-70">
                        {property?.propertyLocation}
                      </div>
                    </div>
                  </div>
                </td>
                {/* Buyer's Info */}
                <td>
                  {property?.userName}
                  <br />
                  <span className="badge badge-ghost badge-sm bg-sky-500 text-white font-bold">
                    {property?.userEmail}
                  </span>
                </td>
                {/* Offered Price */}
                <td>
                  {property?.offeredPrice}TK
                  <br />
                  <span className="badge badge-ghost badge-sm bg-orange-500 text-white font-bold">
                    Asking:({property?.priceRange.minPrice}-
                    {property?.priceRange.maxPrice})TK
                  </span>
                </td>
                {/* Deadline */}
                <td>
                  {property?.deadline}
                  <br />
                </td>
                {/* Status */}
                <td>
                  {(property?.agentValidation).toLowerCase() === "pending" && (
                    <>
                      <div className="flex">
                        <button
                          onClick={() => handleReject(property?._id)}
                          className="btn btn-sm bg-red-500 hover:bg-red-500 text-white hover:text-white font-bold hover:font-bold hover:border-2 hover:border-gray-500 "
                        >
                          Reject
                        </button>
                        <button
                          onClick={() =>
                            handleAccept(property?._id, property?.propertyId)
                          }
                          className="btn btn-sm bg-green-500 hover:bg-green-500 text-white hover:text-white font-bold hover:font-bold hover:border-2 hover:border-gray-500 "
                        >
                          Accept
                        </button>
                      </div>
                    </>
                  )}
                  {(property?.agentValidation).toLowerCase() === "rejected" && (
                    <>
                      <div className="flex">
                        <p className=" bg-red-500  text-white font-bold p-1 rounded-lg ">
                          Rejected
                        </p>
                      </div>
                    </>
                  )}
                  {(property?.agentValidation).toLowerCase() === "accepted" && (
                    <>
                      <div className="flex">
                        <p className=" bg-green-500  text-white font-bold p-1 rounded-lg ">
                          Accepted
                        </p>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedProperties;

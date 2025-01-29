import React from "react";
import useTransactions from "../../../hooks/useTransactions";
import DashboardPageHeading from "../../../components/Shared/DashboardPageHeading/DashboardPageHeading";
import userUserInfo from "../../../hooks/userUserInfo";

const RequestedProperties = () => {
  const [transactions, isTransactionsLoading, refetchTransactions] =
    useTransactions();
  const [userInfo, isUserPending] = userUserInfo();
  if (isTransactionsLoading) {
    return <div>Loading...</div>;
  }
  const myTransactions = transactions?.filter(
    (item) => item?.agentEmail === userInfo.email
  );

  const handleAccept = () => {};
  const handleReject = () => {};
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
              <th className="text-xl text-black font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myTransactions.map((property) => (
              <tr key={property?._id}>
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
                <td>
                  {property?.userName}
                  <br />
                  <span className="badge badge-ghost badge-sm bg-sky-500 text-white font-bold">
                    {property?.userEmail}
                  </span>
                </td>
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
                          onClick={() => handleAccept(property?._id)}
                          className="btn btn-sm bg-green-500 hover:bg-green-500 text-white hover:text-white font-bold hover:font-bold hover:border-2 hover:border-gray-500 "
                        >
                          Accept
                        </button>
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

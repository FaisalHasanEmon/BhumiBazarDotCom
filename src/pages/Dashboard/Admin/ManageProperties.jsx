import React from "react";
import useProperty from "../../../hooks/useProperty";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageProperties = () => {
  const [properties, isPropertyLoading, refetchProperty] = useProperty();
  const axiosSecure = useAxiosSecure();

  if (isPropertyLoading) {
    return <div>Loading ...</div>;
  }

  const handleVerify = (id) => {
    Swal.fire({
      title: "Do you want to verify?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Verify!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const action = "verification";
        const operation = { id: id, action: action };
        const result = await axiosSecure.patch("/properties", operation);
        refetchProperty();
        if (result.data?.modifiedCount > 0) {
          Swal.fire({
            title: "Verified!",
            text: "Property has been verified",
            icon: "success",
          });
        }
      }
    });
  };
  const handleReject = (id) => {
    Swal.fire({
      title: "Do you want to reject this property?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const action = "rejection";
        const operation = { id: id, action: action };
        const result = await axiosSecure.patch("/properties", operation);
        refetchProperty();
        if (result.data.modifiedCount > 0) {
          Swal.fire({
            title: "Rejected!",
            text: "Property has been rejected.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div>
      <h1 className="text-center text-xl font-bold">Manage Properties</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-xl text-black font-semibold">Agent Info</th>
              <th className="text-xl text-black font-semibold">
                Property Info
              </th>
              <th className="text-xl text-black font-semibold">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {properties.map((property) => (
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
                  {property?.agentName}
                  <br />
                  <span className="badge badge-ghost badge-sm bg-sky-500 text-white font-bold">
                    {property?.agentEmail}
                  </span>
                </td>
                <td>
                  {(property?.verificationStatus).toLowerCase() ===
                    "verified" && (
                    <>
                      <h2 className="border p-1 rounded-[10px] bg-green-500 text-white font-bold w-1/2 text-center">
                        {property?.verificationStatus}
                      </h2>
                    </>
                  )}
                  {(property?.verificationStatus).toLowerCase() ===
                    "rejected" && (
                    <>
                      <h2 className="border p-1 rounded-[10px] bg-red-500 text-white font-bold w-1/2 text-center">
                        {property?.verificationStatus}
                      </h2>
                    </>
                  )}
                  {(property?.verificationStatus).toLowerCase() ===
                    "pending" && (
                    <>
                      <div className="flex">
                        <button
                          onClick={() => handleReject(property?._id)}
                          className="btn btn-sm bg-red-500 hover:bg-red-500 text-white hover:text-white font-bold hover:font-bold hover:border-2 hover:border-gray-500 "
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleVerify(property?._id)}
                          className="btn btn-sm bg-green-500 hover:bg-green-500 text-white hover:text-white font-bold hover:font-bold hover:border-2 hover:border-gray-500 "
                        >
                          Verify
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

export default ManageProperties;

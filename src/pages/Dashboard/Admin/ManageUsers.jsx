import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  let check = false;
  const {
    data: allUsers,
    isLoading: isUsersLoading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["AllUsers"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data;
    },
  });

  if (isUsersLoading) {
    return <div>Loading...</div>;
  }
  console.log(allUsers);
  // handle make user admin
  const handleMakeAdmin = (id) => {
    console.log("Make admin id", id);
    Swal.fire({
      title: "Make this user admin?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const queryOperation = { id: id, role: "admin" };
        const res = await axiosSecure.patch("/users", queryOperation);
        refetchUsers();
        if (res.data.modifiedCount === 1) {
          Swal.fire({
            title: "Success",
            text: "User upgraded to admin!",
            icon: "success",
          });
        }
      }
    });
  };
  const handleMakeAgent = (id) => {
    console.log("Make Agent id", id);
    Swal.fire({
      title: "Make this user agent?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Agent!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const queryOperation = { id: id, role: "agent" };
        const res = await axiosSecure.patch("/users", queryOperation);
        refetchUsers();
        if (res.data.modifiedCount === 1) {
          Swal.fire({
            title: "Success",
            text: "User upgraded to agent!",
            icon: "success",
          });
        }
      }
    });
  };
  const handleMarkAsFraud = (id) => {
    console.log("Mark as fraud id", id);
    Swal.fire({
      title: "Mark as fraud?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Mark as Fraud!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const queryOperation = { id: id, role: "agent", fraud: true };
        const res = await axiosSecure.patch(
          "/users/fraudAgent",
          queryOperation
        );
        refetchUsers();
        if (res.data.modifiedCount === 1) {
          Swal.fire({
            title: "Success",
            text: "User upgraded to admin!",
            icon: "success",
          });
        }
        // Swal.fire({
        //   title: "Success",
        //   text: "Marked as fraud!",
        //   icon: "success",
        // });
      }
    });
  };
  const handleDeleteUser = (id) => {
    console.log("Delete user id", id);
    Swal.fire({
      title: "Delete this user?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Success",
          text: "User Deleted!",
          icon: "success",
        });
      }
    });
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>User Info</th>
              <th>Role</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allUsers?.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{user?.email}</div>
                      <div className="text-sm opacity-50">{user?.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {(user?.role).toLowerCase() === "user" && (
                    <p className="bg-orange-500 w-[60px] text-center text-white font-bold p-1 rounded-md">
                      User
                    </p>
                  )}
                  {(user?.role).toLowerCase() === "admin" && (
                    <p className="bg-green-500 w-[60px] text-center text-white font-bold p-1 rounded-md">
                      Admin
                    </p>
                  )}
                  {(user?.role).toLowerCase() === "agent" && (
                    <p className="bg-blue-500 w-[60px] text-center text-white font-bold p-1 rounded-md">
                      Agent
                    </p>
                  )}
                </td>
                <td>
                  {(user?.role).toLowerCase() === "user" && (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleMakeAdmin(user?._id)}
                        className="btn w-[100px] btn-xs font-bold text-bold text-white bg-green-500 hover:bg-green-500 hover:border-2 hover:border-gray-500"
                      >
                        Make Admin
                      </button>
                      <button
                        onClick={() => handleMakeAgent(user?._id)}
                        className="btn w-[100px] btn-xs font-bold text-bold text-white  bg-blue-500 hover:bg-blue-500 hover:border-2 hover:border-gray-500"
                      >
                        Make Agent
                      </button>
                    </div>
                  )}
                  {(user?.role).toLowerCase() === "admin" && (
                    <p className=" p-1 rounded-md text-center w-[100px]  font-bold text-bold text-white  bg-green-500 hover:bg-green-500 hover:border-2 hover:border-gray-500">
                      Admin
                    </p>
                  )}
                  {(user?.role).toLowerCase() === "agent" &&
                    (user?.fraud === true || (
                      <button
                        onClick={() => handleMarkAsFraud(user?._id)}
                        className="btn w-[100px] btn-xs font-bold text-bold text-white  bg-red-500 hover:bg-red-500 hover:border-2 hover:border-gray-500"
                      >
                        Mark As Fraud
                      </button>
                    ))}
                  {(user?.role).toLowerCase() === "agent" &&
                    user?.fraud === true && (
                      <button
                        onClick={() => handleMarkAsFraud(user?._id)}
                        className="btn w-[100px] btn-xs font-bold text-bold text-white  bg-red-800 hover:bg-red-800 hover:border-2 hover:border-gray-500"
                      >
                        Fraud Agent
                      </button>
                    )}
                </td>
                <th>
                  {(user?.role).toLowerCase() === "user" && (
                    <button
                      onClick={() => handleDeleteUser(user?._id)}
                      className="btn btn-ghost btn-xs bg-red-600 text-white font-bold"
                    >
                      Delete
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;

import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useTheme from "../../../hooks/useTheme";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useProperty from "../../../hooks/useProperty";
import DashboardPageHeading from "../../../components/Shared/DashboardPageHeading/DashboardPageHeading";
import userUserInfo from "../../../hooks/userUserInfo";
import Loading from "../../../components/Shared/Loadingbar/Loading";

const AddProperty = () => {
  //Custom Hooks
  const { user } = useAuth(); //Logged in use hook
  const [userInfo, isUserPending] = userUserInfo(); //Logged in use hook
  const axiosPublic = useAxiosPublic(); //Public axios hook
  const axiosSecure = useAxiosSecure(); //Secure axios hook
  const { notifySuccess, notifyWarning, notifyError } = useTheme(); //Theme hook
  const [, , refetchProperty] = useProperty(); //Get all property hook

  // Keys and links
  const image_hosting_key = import.meta.env.VITE_IMBB_API_KEY; //imgbb key
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`; //imgbb hosting api

  //react-hook-form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    error,
  } = useForm();

  if (isUserPending) {
    return <Loading></Loading>;
  }

  //Step-1: Form data collector function
  const onSubmit = async (data) => {
    let minPrice = 0;
    let maxPrice = 0;
    if (!isNaN(data.minPrice) || !isNaN(data.maxPrice)) {
      minPrice = parseFloat(data.minPrice);
      maxPrice = parseFloat(data.maxPrice);
      if (isNaN(data.minPrice) || isNaN(data.maxPrice)) {
        return notifyError("Price cannot be a string");
      }
      if (minPrice >= maxPrice) {
        return notifyWarning(
          "Minimum price must be greater than maximum price"
        );
      }
    }
    // Taking the image
    const propertyImage = { image: data.propertyImage[0] };

    // uploading the image to imgbb
    const res = await axiosPublic.post(image_hosting_api, propertyImage, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    // if image successfully uploaded to imgbb
    if (res.data.success) {
      const property = {
        priceRange: {
          minPrice: minPrice,
          maxPrice: maxPrice,
        },
        propertyTitle: data.propertyTitle,
        propertyLocation: data.propertyLocation,
        agentName: data.agentName,
        agentEmail: data.agentEmail,
        propertyImage: res.data.data.display_url,
        verificationStatus: "Pending",
      };

      const addPropertyRes = await axiosSecure.post("/properties", property);

      if (addPropertyRes.data.insertedId) {
        reset();
        notifySuccess("Property Successfully Added");
        refetchProperty();
      }
    }
  }; // your form submit function which will invoke after successful validation

  console.log(user);

  // Input component
  const Input = ({
    label = "demo",
    type = "demo",
    name = "demo",
    placeholder = "demo",
  }) => {
    if (type === "file") {
      return (
        <>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">{placeholder}</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              {...register(`${name}`, { required: true })}
            />
          </label>
        </>
      );
    }
    return (
      <>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">{label}</span>
          </div>
          <input
            type={type}
            placeholder={placeholder}
            className="input input-bordered w-full "
            {...register(`${name}`, { required: true })}
          />
        </label>
      </>
    );
  };
  return (
    <div className="pr-3">
      <h1 className="text-2xl font-black mb-3 text-center">Add Property</h1>
      {userInfo?.fraud === true ? (
        <>
          <DashboardPageHeading
            heading={"You cannot add any property as you're marked as fraud"}
          ></DashboardPageHeading>
        </>
      ) : (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border p-3 rounded-lg"
          >
            <div className="my-3">
              <h3 className="text-xl font-semibold">Agent Information</h3>
              <div className="divider w-full max-w-xs my-1"></div>
              <div className="flex flex-col md:flex-row gap-5">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">Email</span>
                  </div>
                  <input
                    type="email"
                    className="input input-bordered w-full "
                    defaultValue={user.email}
                    {...register("agentEmail")}
                  />
                </label>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">name</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full "
                    defaultValue={user.displayName}
                    {...register("agentName")}
                  />
                </label>
              </div>
            </div>
            <div className="divider"></div>
            <div className="grid grid-cols1 gap-5 md:grid-cols-2  *:pr-4">
              {/* Property Information Input Fields */}
              <div className="w-full">
                <h3 className="text-xl font-semibold">Property Information</h3>
                <div className="divider w-full max-w-xs my-1"></div>
                <Input
                  label={"Property Title"}
                  type={"text"}
                  name={"propertyTitle"}
                  placeholder={"Title"}
                ></Input>
                <Input
                  label={"Property location"}
                  type={"text"}
                  name={"propertyLocation"}
                  placeholder={"location"}
                ></Input>
              </div>
              {/* Price Range Information Input Fields */}
              <div>
                <h3 className="text-xl font-semibold">Price Range</h3>
                <div className="divider w-full max-w-xs my-1"></div>
                <Input
                  label={"Minimum Price (Minimum price is 5000TK)"}
                  type={"text"}
                  name={"minPrice"}
                  placeholder={"Minimum Price "}
                ></Input>
                <Input
                  label={"Maximum Price (Minimum price is 5100TK)"}
                  type={"text"}
                  name={"maxPrice"}
                  placeholder={"Maximum Price"}
                ></Input>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Property Image</h3>
                <div className="divider w-full max-w-xs my-1"></div>
                <Input
                  label={"Property Image"}
                  type={"file"}
                  name={"propertyImage"}
                  placeholder={"Image"}
                ></Input>
              </div>
            </div>
            <div className="mt-5 *:mr-3 *:w-36">
              <input type="submit" className="btn bg-green-500" />
              <button onClick={reset} type="button" className="btn bg-red-500">
                Clear
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default AddProperty;

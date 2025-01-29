import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import DashboardPageHeading from "../../../components/Shared/DashboardPageHeading/DashboardPageHeading";
import {
  MdOutlineEmail,
  MdOutlinePermIdentity,
  MdOutlineRateReview,
  MdOutlineSubtitles,
} from "react-icons/md";
import {
  FaBangladeshiTakaSign,
  FaLocationDot,
  FaRegFaceGrinHearts,
} from "react-icons/fa6";
import useTheme from "../../../hooks/useTheme";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useWishlist from "../../../hooks/useWishlist";

const MakeOffer = () => {
  const loaderData = useLoaderData();
  const { notifyError, notifySuccess, notifyWarning } = useTheme();
  const [, , refetchWishlist] = useWishlist();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Ensure two digits
    const day = String(today.getDate()).padStart(2, "0"); // Ensure two digits
    return `${year}-${month}-${day}`;
  }

  function convertDateToNumber(dateString) {
    return Number(dateString.replace(/-/g, ""));
  }

  const onSubmit = async (formData) => {
    const todayDateInString = getTodayDate();
    const dateValidator = convertDateToNumber(todayDateInString);
    const deadlineCheck = convertDateToNumber(formData.deadline);
    if (deadlineCheck < dateValidator) {
      return notifyError("Select A Valid Date");
    }
    if (isNaN(formData.offerPrice)) {
      return notifyError("Offered price cannot be a string");
    }
    const offeredPrice = parseFloat(formData.offerPrice);
    if (offeredPrice < loaderData?.priceRange?.minPrice) {
      return notifyWarning("Make a valid offer");
    }
    const deadline = formData.deadline;

    const offer = { offeredPrice: offeredPrice, deadline: deadline };

    const { _id: offerId, ...remainingInfo } = loaderData;
    const offerData = {
      offerId,
      ...remainingInfo,
      ...offer,
      agentValidation: "Pending",
    };
    const makeOfferRes = await axiosSecure.post("/requestedOffer", offerData);
    if (makeOfferRes.data.insertedId) {
      const res = await axiosSecure.delete(`/wishedItem/${loaderData?._id}`);
      refetchWishlist();
      return notifySuccess(
        "Offer successfully made and property removed form wishlist!"
      );
    }
  };

  return (
    <div>
      <DashboardPageHeading heading={"Make An Offer"}></DashboardPageHeading>
      <div className="divider"></div>
      <div className="flex flex-col gap-5 lg:flex-row *:border ">
        {/* Property Image Section Starts */}
        <figure className="overflow-clip lg:h-[450px] rounded-lg">
          <img
            src={loaderData?.propertyImage}
            alt="Properties"
            className="w-full lg:h-full lg:object-cover "
          />
        </figure>
        {/* Property Image Section Ends */}

        {/* Property Details Starts */}
        <div className="card-body lg:justify-between bg-slate-200 rounded-lg">
          <div>
            <div>
              <div className="flex justify-between items-center">
                <h2 className="card-title justify-start items-baseline">
                  <MdOutlineSubtitles />
                  {loaderData?.propertyTitle}
                </h2>
                <div>
                  {loaderData?.verificationStatus?.toLowerCase() ===
                    "verified" && (
                    <h2 className="border p-1 rounded-[10px] bg-green-500 text-white font-bold">
                      {loaderData?.verificationStatus}
                    </h2>
                  )}
                  {(loaderData?.verificationStatus).toLowerCase() ===
                    "pending" && (
                    <h2 className="border p-1 rounded-[10px] bg-yellow-500 text-white font-bold">
                      {loaderData?.verificationStatus}
                    </h2>
                  )}
                  {(loaderData?.verificationStatus).toLowerCase() ===
                    "rejected" && (
                    <h2 className="border p-1 rounded-[10px] bg-red-500 text-white font-bold">
                      {loaderData?.verificationStatus}
                    </h2>
                  )}
                </div>
              </div>

              <p className="card-title text-lg font-medium gap-1">
                <FaLocationDot />
                {loaderData?.propertyLocation}
              </p>
              <p className="card-title text-lg font-medium gap-1">
                <FaBangladeshiTakaSign />
                Price Range : {loaderData?.priceRange.minPrice}-
                {loaderData?.priceRange.maxPrice}TK
              </p>
            </div>

            <div className="divider my-1"></div>
            <div className="space-y-2">
              <p className="text-base font-bold">Agent Information</p>
              <div className="flex justify-start items-center gap-3">
                <figure>
                  <img
                    src={loaderData?.agentImage}
                    className="w-12 h-12 rounded-2xl object-cover"
                    alt="Agent "
                  />
                </figure>
                <div className="text-base font-medium">
                  <p className="flex justify-start items-center gap-1">
                    <MdOutlinePermIdentity />
                    Name: {loaderData?.agentName}
                  </p>
                  <p className="flex justify-start items-center gap-1">
                    <MdOutlineEmail />
                    Email: {loaderData?.agentEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex gap-1">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col lg:flex-row gap-3 lg:items-end"
            >
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="text-base font-bold">Offer A Price</span>
                </div>
                <input
                  type="text"
                  placeholder="Your Price"
                  className="input input-bordered w-full max-w-xs"
                  {...register("offerPrice", { required: true })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="text-base font-bold">
                    Provide A Deadline
                  </span>
                </div>
                <input
                  type="date"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  {...register("deadline", { required: true })}
                />
              </label>

              <input className="btn" type="submit" value="Submit" />
            </form>
          </div>
        </div>
        {/* Property Details Ends */}
      </div>
    </div>
  );
};

export default MakeOffer;

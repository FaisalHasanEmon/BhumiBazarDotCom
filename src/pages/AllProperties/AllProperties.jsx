import { useState } from "react";
import Loading from "../../components/Shared/Loadingbar/Loading";
import PropertyCard from "../../components/Shared/PropertyCard/PropertyCard";
import useProperty from "../../hooks/useProperty";

const AllProperties = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [properties, isPropertyLoading] = useProperty(searchLocation); // Pass location to the hook

  // if (isPropertyLoading) {
  //   return <Loading />;
  // }

  const verifiedProperties = properties?.filter(
    (items) => items?.verificationStatus.toLowerCase() === "verified"
  );

  return (
    <div>
      {/* Search Input */}
      <div className="pt-5 mb-5 text-left flex justify-start items-center gap-1">
        <label className="input w-1/2 md:w-3/12 input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search by Location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <button onClick={() => setSearchLocation("")} className="btn">
          Reset
        </button>
      </div>

      {/* Property List */}
      {isPropertyLoading ? (
        <Loading></Loading>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {verifiedProperties.length > 0 ? (
            verifiedProperties?.map((property) => (
              <PropertyCard key={property?._id} property={property} />
            ))
          ) : (
            <div>
              <h1 className="text-center text-3xl font-bold">
                No Verified Property Found
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllProperties;

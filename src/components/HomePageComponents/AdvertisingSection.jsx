import useProperty from "../../hooks/useProperty";
import PropertyCard from "../Shared/PropertyCard/PropertyCard";
import Loading from "../Shared/Loadingbar/Loading";

const AdvertisingSection = () => {
  const [properties, isPropertyLoading, refetchProperty] = useProperty();
  if (isPropertyLoading) {
    return <Loading></Loading>;
  }

  const verified = (Array.isArray(properties) ? properties : []).filter(
    (item) => (item?.verificationStatus).toLowerCase() === "verified"
  );
  const lastThree = verified?.slice(-3) || [];

  return (
    <>
      {lastThree ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lastThree?.map((property) => (
            <PropertyCard
              key={property?._id}
              property={property}
            ></PropertyCard>
          ))}
        </div>
      ) : (
        <div>
          <p>Nothing Found</p>
        </div>
      )}
    </>
  );
};

export default AdvertisingSection;

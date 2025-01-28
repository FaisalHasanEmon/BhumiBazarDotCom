import PropertyCard from "../../components/Shared/PropertyCard/PropertyCard";
import useProperty from "../../hooks/useProperty";

const AllProperties = () => {
  const [properties, isPropertyLoading] = useProperty();
  if (isPropertyLoading) {
    return <div>Loading...</div>;
  }
  const verifiedProperties = properties?.filter(
    (items) => items?.verificationStatus.toLowerCase() === "verified"
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {verifiedProperties.length > 0 ? (
        <>
          {verifiedProperties?.map((property) => (
            <PropertyCard
              key={property?._id}
              property={property}
            ></PropertyCard>
          ))}
        </>
      ) : (
        <>
          <div>
            <h1 className="text-center text-3xl font-bold">
              No Verified Property Founded
            </h1>
          </div>
        </>
      )}
    </div>
  );
};

export default AllProperties;

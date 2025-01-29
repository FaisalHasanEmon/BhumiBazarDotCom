import React from "react";
import useProperty from "../../hooks/useProperty";
import PropertyCard from "../Shared/PropertyCard/PropertyCard";

const AdvertisingSection = () => {
  const [properties, isPropertyLoading, refetchProperty] = useProperty();
  if (isPropertyLoading) {
    return <div>Loading...</div>;
  }

  const verified = properties.filter(
    (item) => (item?.verificationStatus).toLowerCase() === "verified"
  );
  const lastThree = verified.slice(-3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {lastThree?.map((property) => (
        <PropertyCard key={property?._id} property={property}></PropertyCard>
      ))}
    </div>
  );
};

export default AdvertisingSection;

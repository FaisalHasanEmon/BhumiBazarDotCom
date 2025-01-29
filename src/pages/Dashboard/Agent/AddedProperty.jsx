import React from "react";
import useProperty from "../../../hooks/useProperty";
import userUserInfo from "../../../hooks/userUserInfo";
import PropertyCard from "../../../components/Shared/PropertyCard/PropertyCard";
import Loading from "../../../components/Shared/Loadingbar/Loading";

const AddedProperty = () => {
  const [userInfo, isUserPending] = userUserInfo();
  const [properties, isPropertyLoading, refetchProperty] = useProperty();
  if (isPropertyLoading || isUserPending) {
    return <Loading></Loading>;
  }

  const myAddedProperties = properties?.filter(
    (property) => property.agentEmail === userInfo.email
  );

  const from = "agent";
  return (
    <div>
      {myAddedProperties?.length === 0 ? (
        <>
          <div className="text-3xl font-bold text-center">
            You have not added Any Property
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {myAddedProperties?.map((property) => (
              <PropertyCard
                key={property?._id}
                property={property}
                from={from}
              ></PropertyCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AddedProperty;

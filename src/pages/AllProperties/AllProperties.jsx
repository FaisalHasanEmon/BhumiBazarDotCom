import PropertyCard from "../../components/Shared/PropertyCard/PropertyCard";
import useProperty from "../../hooks/useProperty";

const AllProperties = () => {
  const [properties, isPropertyLoading] = useProperty();
  if (isPropertyLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {properties.map((property) => (
        <PropertyCard key={property?._id} property={property}></PropertyCard>
      ))}
    </div>
  );
};

export default AllProperties;

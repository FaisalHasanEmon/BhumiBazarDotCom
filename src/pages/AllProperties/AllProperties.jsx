import useProperty from "../../hooks/useProperty";

const AllProperties = () => {
  const [properties, isPropertyLoading] = useProperty();
  if (isPropertyLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {properties.map((property) => (
        <div key={property._id}>
          <img src={property?.propertyImage} />
        </div>
      ))}
    </div>
  );
};

export default AllProperties;

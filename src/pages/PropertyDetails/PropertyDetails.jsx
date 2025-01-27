import React from "react";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const params = useParams();
  console.log(params);
  return <div>Property Details</div>;
};

export default PropertyDetails;

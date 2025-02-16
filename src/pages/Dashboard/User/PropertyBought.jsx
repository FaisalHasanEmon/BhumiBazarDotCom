import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import DashboardPageHeading from "../../../components/Shared/DashboardPageHeading/DashboardPageHeading";
import useTransactions from "../../../hooks/useTransactions";
import PropertyCard from "../../../components/Shared/PropertyCard/PropertyCard";
import Loading from "../../../components/Shared/Loadingbar/Loading";

const PropertyBought = () => {
  const [transactions, isTransactionsLoading, refetchTransactions] =
    useTransactions();
  if (isTransactionsLoading) {
    return <Loading></Loading>;
  }
  console.log(transactions);
  const from = "propertyBought";
  return (
    <div>
      <DashboardPageHeading
        heading={"Property Transaction"}
      ></DashboardPageHeading>
      <div className="divider"></div>
      {transactions.length === 0 ? (
        <>
          <DashboardPageHeading
            heading={"No Transaction Found"}
          ></DashboardPageHeading>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pr-4 mb-56">
            {transactions?.map((property) => (
              <PropertyCard
                key={property._id}
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

export default PropertyBought;

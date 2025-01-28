import React from "react";
import DashboardPageHeading from "../../../components/Shared/DashboardPageHeading/DashboardPageHeading";
import useWishlist from "../../../hooks/useWishlist";
import userUserInfo from "../../../hooks/userUserInfo";
import PropertyCard from "../../../components/Shared/PropertyCard/PropertyCard";

const Wishlist = () => {
  const [wishlistData, isWishlistLoading, refetchWishlist] = useWishlist();
  const [userInfo, isUserPending] = userUserInfo();
  console.log(wishlistData);
  const myWishlist = wishlistData?.filter(
    (item) => item.userEmail === userInfo.email
  );
  const from = "user";
  return (
    <div>
      <DashboardPageHeading
        heading={"My wishlist property"}
      ></DashboardPageHeading>
      <div className="divider"></div>
      <div>
        {myWishlist?.length === 0 ? (
          <>
            <DashboardPageHeading
              heading={"You haven't wished any property"}
            ></DashboardPageHeading>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {myWishlist?.map((property) => (
              <PropertyCard
                key={property?._id}
                property={property}
                from={from}
              ></PropertyCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

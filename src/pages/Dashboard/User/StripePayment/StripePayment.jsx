import React from "react";
import { useLoaderData } from "react-router-dom";
import Loading from "../../../../components/Shared/Loadingbar/Loading";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckOutForm";
import DashboardPageHeading from "../../../../components/Shared/DashboardPageHeading/DashboardPageHeading";

// Add publishable key
const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
const StripePayment = () => {
  const loader = useLoaderData();
  if (!loader) {
    return <Loading></Loading>;
  }
  console.log(loader);
  return (
    <div>
      <DashboardPageHeading
        heading={"Make Payment With Stripe"}
      ></DashboardPageHeading>
      <Elements stripe={stripePromise}>
        <CheckoutForm></CheckoutForm>
      </Elements>
    </div>
  );
};

export default StripePayment;

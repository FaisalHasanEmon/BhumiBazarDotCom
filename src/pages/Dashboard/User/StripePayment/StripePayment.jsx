import React from "react";
import { useLoaderData } from "react-router-dom";
import Loading from "../../../../components/Shared/Loadingbar/Loading";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckOutForm";
import DashboardPageHeading from "../../../../components/Shared/DashboardPageHeading/DashboardPageHeading";

// Add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_GateWay_PK);
const StripePayment = () => {
  const loader = useLoaderData();
  if (!loader) {
    return <Loading></Loading>;
  }
  console.log(loader);
  const { offeredPrice } = loader;

  return (
    <div>
      <DashboardPageHeading
        heading={"Make Payment With Stripe"}
      ></DashboardPageHeading>
      <Elements stripe={stripePromise}>
        <CheckoutForm offeredPrice={offeredPrice}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default StripePayment;

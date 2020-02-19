import React from "react";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "react-stripe-elements";
import { useLocation } from "react-router-dom";

function Payment({ user }) {
  // const location = useLocation();
  // const {title} = location.state;
  return (
    // // <div>{picture[0]}</div>
    // <div>{title}</div>
    // // <div>{price}</div>
    <Elements>
      <CheckoutForm user={user} />
    </Elements>
  );
}
export default Payment;

import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";
import "../assets/Style/MyCardElement.css";

function CheckoutForm({ user, stripe }) {
  const [complete, setComplete] = useState(false);
  return !complete ? (
    <div className="payment-page">
      <div className="payment">
        <h2>Vos coordonnées bancaires</h2>
        {/*1. on affiche le formulaire de carte bleue*/}
        <CardElement className="MyCardElement" />
        <button
          className="payment-process"
          onClick={async event => {
            //2. on envoie le numéro de carte à stripe
            const stripeResponse = await stripe.createToken({
              user: user
            });

            if (stripeResponse.error) {
              alert(stripeResponse.error.message);
            } else {
              //4. Stripe nous retourne un token
              console.log("stripeResponse.token", stripeResponse.token);
              //5. on envoie ce token au back-end
              const paymentResponse = await axios.post(
                "http://localhost:4001/pay",
                { token: stripeResponse.token.id }
              );
              console.log("paymentResponse", paymentResponse);

              // 10. Le back-end nous confirme que le paiement a été effectué
              if (paymentResponse.status === 200) {
                setComplete(true);
              } else {
                alert("an error occured");
                console.error(paymentResponse);
              }
            }
          }}
        >
          Procéder au paiement
        </button>
      </div>
    </div>
  ) : (
    <span>Purchase Complete</span>
  );
}

export default injectStripe(CheckoutForm);

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "components/checkoutPage/CheckoutForm";
import { ORANGE_COLOR } from "constants/colors";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthService from "services/AuthService";

function CheckoutPage() {
  const stripe = loadStripe(process.env.REACT_APP_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  const [email, setEmail] = useState();
  const location = useLocation();
  const { clientSecret, price } = location.state;
  const loader = "auto";
  const appearance = {
    theme: "flat",
    variables: {
      colorPrimary: ORANGE_COLOR,
    },
  };

  useEffect(() => {
    let email = AuthService.getEmailFromJwt();
    setEmail(email);
  }, []);

  return (
    <Elements stripe={stripe} options={{ clientSecret, appearance, loader }}>
      <CheckoutForm email={email} price={price} />
    </Elements>
  );
}

export default CheckoutPage;

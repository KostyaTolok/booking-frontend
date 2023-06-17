import { LinkAuthenticationElement, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import AlertsService from "services/AlertsService";
import "./CheckoutForm.scss";
import Button from "components/common/Button";
import { useState } from "react";
import AppLoader from "components/common/AppLoader";
import { useNavigate } from "react-router-dom";
import { HOME_LINK } from "constants/links";

function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {},
        redirect: "if_required",
      })
      .then(() => {
        setLoading(false);
        navigate(HOME_LINK);
      })
      .catch((error) => {
        setLoading(false);
        AlertsService.showAlert(error);
      });
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <AppLoader open={loading} />
      <h2 className="checkout-form__title">Contact info</h2>
      <LinkAuthenticationElement
        options={{
          defaultValues: {
            email: props.email,
          },
        }}
      />
      <h2 className="checkout-form__title">Payment info</h2>
      <PaymentElement />
      <Button
        className="button_large button_orange button_rounded button_full-width checkout-form__button"
        type="submit"
      >
        Pay ${props.price}
      </Button>
    </form>
  );
}

export default CheckoutForm;

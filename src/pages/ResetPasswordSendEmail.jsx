import { yupResolver } from "@hookform/resolvers/yup";
import AppTextField from "components/common/AppTextField";
import Button from "components/common/Button";
import Form from "components/common/Form";
import { ALERT_SEVERITIES } from "constants/enums";
import { LOGIN_LINK } from "constants/links";
import { MAX_EMAIL_LENGTH } from "constants/validation";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AlertsService from "services/AlertsService";
import { UsersApiService } from "services/UsersApiService";
import * as yup from "yup";

const resetPasswordSendEmailSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter vaild email")
    .max(MAX_EMAIL_LENGTH, ({ max }) => `Email must be no more than ${max} characters`),
});

function ResetPasswordSendEmail() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(resetPasswordSendEmailSchema),
    mode: "onChange",
  });

  function onSubmit(data) {
    UsersApiService.resetPasswordSendEmail(data.email)
      .then(() => {
        AlertsService.showAlert(`Reset password link was sent to ${data.email}`, ALERT_SEVERITIES.SUCCESS);
      })
      .catch((error) => {
        AlertsService.showAlert(error);
      });
  }

  return (
    <Form
      title="Password Reset"
      subtitle="Please enter your email and we will send you a reset password link!"
      onSubmit={handleSubmit(onSubmit)}
    >
      <AppTextField
        className="form__input"
        name="email"
        control={control}
        variant="filled"
        label="Email"
        helperText={errors.email?.message}
      />
      <Button className="button_large button_orange form__button" type="submit">
        Next
      </Button>
      <p className="form__text">
        Don&apos;t need password reset?{" "}
        <Link className="form__link" to={LOGIN_LINK}>
          Log In
        </Link>
      </p>
    </Form>
  );
}

export default ResetPasswordSendEmail;

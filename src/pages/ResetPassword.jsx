import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/common/Button";
import Form from "components/common/Form";
import PasswordTextField from "components/common/PasswordTextField";
import { ALERT_SEVERITIES } from "constants/enums";
import { HOME_LINK, LOGIN_LINK } from "constants/links";
import {
  MIN_PASSWORD_DIGITS,
  MIN_PASSWORD_LENGTH,
  MIN_PASSWORD_LOWERCASE,
  MIN_PASSWORD_UPPERCASE,
} from "constants/validation";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import AlertsService from "services/AlertsService";
import { UsersApiService } from "services/UsersApiService";
import * as yup from "yup";

const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(MIN_PASSWORD_LENGTH, ({ min }) => `Password must be at least ${min} characters`)
    .minLowercase(
      MIN_PASSWORD_LOWERCASE,
      `Password must contain at least ${MIN_PASSWORD_LOWERCASE} lowercase character`
    )
    .minUppercase(
      MIN_PASSWORD_UPPERCASE,
      `Password must contain at least ${MIN_PASSWORD_UPPERCASE} uppercase character`
    )
    .minNumbers(MIN_PASSWORD_DIGITS, `Password must contain at least ${MIN_PASSWORD_DIGITS} digit number`),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required("Confirm password is required"),
});

function ResetPassword() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(resetPasswordSchema),
    mode: "onChange",
  });
  const params = useParams();
  const navigate = useNavigate();
  const token = params.token;

  function onSubmit(data) {
    UsersApiService.resetPasswordConfirm({
      token: token,
      newPassword: data.password,
    })
      .then(() => {
        AlertsService.showAlert("Password was changed successfully", ALERT_SEVERITIES.SUCCESS);
        navigate(HOME_LINK);
      })
      .catch((error) => {
        AlertsService.showAlert(error);
      });
  }

  return (
    <Form title="Password Reset" subtitle="Please enter your new password!" onSubmit={handleSubmit(onSubmit)}>
      <PasswordTextField name="password" control={control} label="Password" helperText={errors.password?.message} />
      <PasswordTextField
        name="confirmPassword"
        control={control}
        label="Confirm Password"
        helperText={errors.confirmPassword?.message}
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

export default ResetPassword;

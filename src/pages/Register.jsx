import Form from "components/common/Form";
import { useForm } from "react-hook-form";
import AppTextField from "components/common/AppTextField";
import Button from "components/common/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
import {
  MAX_EMAIL_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_DIGITS,
  MIN_PASSWORD_LENGTH,
  MIN_PASSWORD_LOWERCASE,
  MIN_PASSWORD_UPPERCASE,
  MIN_USERNAME_LENGTH,
} from "constants/validation";
import PasswordTextField from "components/common/PasswordTextField";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_LINK, VERIFY_CODE_LINK } from "constants/links";
import { UsersApiService } from "services/UsersApiService";
import AlertsService from "services/AlertsService";
import AuthService from "services/AuthService";

YupPassword(yup);

const registerValidationSchema = yup.object({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(MIN_USERNAME_LENGTH, ({ min }) => `Full name must be more than ${min} characters`)
    .max(MAX_USERNAME_LENGTH, ({ max }) => `Full name can't be more than ${max} characters`),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter vaild email")
    .max(MAX_EMAIL_LENGTH, ({ max }) => `Email must be no more than ${max} characters`),
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

function Register() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(registerValidationSchema),
    mode: "onChange",
  });

  function onSubmit(data) {
    UsersApiService.createUser({
      email: data.email,
      fullName: data.fullName,
      password: data.password,
    })
      .then(() => {
        UsersApiService.login({
          email: data.email,
          password: data.password,
        }).then((response) => {
          const accessToken = response.data.access_token;
          const refreshToken = response.data.refresh_token;

          AuthService.login(accessToken, refreshToken);

          UsersApiService.sendVerificationCodeEmail()
            .then(() => {
              navigate(VERIFY_CODE_LINK, { state: { email: data.email } });
            })
            .catch((error) => {
              AlertsService.showAlert(error);
            });
        });
      })
      .catch((error) => {
        AlertsService.showAlert(error);
      });
  }

  return (
    <Form
      title="Getting started!"
      subtitle="Looks like you are new to us! Create an account for a complete experience."
      onSubmit={handleSubmit(onSubmit)}
    >
      <AppTextField
        className="form__input"
        name="fullName"
        control={control}
        variant="filled"
        label="Full name"
        helperText={errors.fullName?.message}
      />
      <AppTextField
        className="form__input"
        name="email"
        control={control}
        variant="filled"
        label="Email"
        helperText={errors.email?.message}
      />
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
        Already have an account?{" "}
        <Link className="form__link" to={LOGIN_LINK}>
          Log In
        </Link>
      </p>
    </Form>
  );
}

export default Register;

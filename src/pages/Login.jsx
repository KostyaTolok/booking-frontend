import { yupResolver } from "@hookform/resolvers/yup";
import AppTextField from "components/common/AppTextField";
import Button from "components/common/Button";
import Form from "components/common/Form";
import PasswordTextField from "components/common/PasswordTextField";
import { HOME_LINK, REGISTER_LINK, RESET_PASSWORD_LINK } from "constants/links";
import { MAX_EMAIL_LENGTH, MIN_PASSWORD_LENGTH } from "constants/validation";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AlertsService from "services/AlertsService";
import AuthService from "services/AuthService";
import { UsersApiService } from "services/UsersApiService";
import * as yup from "yup";

const loginValidationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter vaild email")
    .max(MAX_EMAIL_LENGTH, ({ max }) => `Email must be no more than ${max} characters`),
  password: yup
    .string()
    .required("Password is required")
    .min(MIN_PASSWORD_LENGTH, ({ min }) => `Password must be at least ${min} characters`),
});

function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginValidationSchema),
    mode: "onChange",
  });
  const navigate = useNavigate();

  function onSubmit(data) {
    UsersApiService.login({
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        const accessToken = response.data["access_token"];
        const refreshToken = response.data["refresh_token"];
        AuthService.login(accessToken, refreshToken);
        navigate(HOME_LINK);
      })
      .catch((error) => {
        AlertsService.showAlert(error);
      });
  }

  return (
    <Form title="Log In" subtitle="Please enter your username and password!" onSubmit={handleSubmit(onSubmit)}>
      <AppTextField
        className="form__input"
        name="email"
        control={control}
        variant="filled"
        label="Email"
        helperText={errors.email?.message}
      />
      <PasswordTextField name="password" control={control} label="Password" helperText={errors.password?.message} />
      <Button className="button_large button_orange form__button" type="submit">
        Next
      </Button>
      <p className="form__text">
        Don&apos;t have an account?{" "}
        <Link className="form__link" to={REGISTER_LINK}>
          Sign Up
        </Link>
      </p>
      <p className="form__text">
        Forgot your password?{" "}
        <Link className="form__link" to={RESET_PASSWORD_LINK}>
          Reset Password
        </Link>
      </p>
    </Form>
  );
}

export default Login;

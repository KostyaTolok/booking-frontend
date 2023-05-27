import { Stack } from "@mui/material";
import AppTextField from "components/common/AppTextField";
import Button from "components/common/Button";
import { HOME_LINK, UPDATE_PASSWORD_LINK, VERIFY_CODE_LINK } from "constants/links";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthService from "services/AuthService";
import { UsersApiService } from "services/UsersApiService";
import * as yup from "yup";
import "./Profile.scss";
import { MAX_EMAIL_LENGTH, MAX_USERNAME_LENGTH, MIN_USERNAME_LENGTH } from "constants/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import AlertsService from "services/AlertsService";
import { ALERT_SEVERITIES } from "constants/enums";
import AppLink from "components/common/AppLink";
import AppDialog from "components/common/AppDialog";

const userInfoValidationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter vaild email")
    .max(MAX_EMAIL_LENGTH, ({ max }) => `Email must be no more than ${max} characters`),
  fullName: yup
    .string()
    .required("Full name is required")
    .min(MIN_USERNAME_LENGTH, ({ min }) => `Full name must be more than ${min} characters`)
    .max(MAX_USERNAME_LENGTH, ({ max }) => `Full name can't be more than ${max} characters`),
});

function Profile() {
  const {
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      fullName: "",
    },
    resolver: yupResolver(userInfoValidationSchema),
    mode: "onChange",
  });
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  const [dialog, setDialog] = useState({
    title: "",
    text: "",
    onConfirm: null,
  });
  const [openDialog, setOpenDialog] = useState(false);

  function onLogoutClick() {
    AuthService.logout();
    navigate(HOME_LINK);
  }

  function onDeleteAccountClick() {
    setDialog({
      title: "Are you sure?",
      text: "You won't be able to cancel deletion of account",
      onConfirm: () => {
        UsersApiService.deleteMe()
          .then(() => {
            setOpenDialog(false);
            AuthService.logout();
            navigate(HOME_LINK);
          })
          .catch((error) => {
            setOpenDialog(false);
            AlertsService.showAlert(error);
          });
      },
    });
    setOpenDialog(true);
  }

  function showUnverifiedEmailAlert() {
    AlertsService.showAlert("Email is unverified! Verify to make full use of PandaHouse.", ALERT_SEVERITIES.WARNING);
  }

  useEffect(() => {
    UsersApiService.getMe()
      .then((response) => {
        reset({
          email: response.data.email,
          fullName: response.data.full_name,
        });

        setIsActive(response.data.is_active);

        if (!response.data.is_active) {
          showUnverifiedEmailAlert();
        }
      })
      .catch(() => {
        setIsActive(false);

        let email = AuthService.getEmailFromJwt();

        reset({
          email: email,
        });
        showUnverifiedEmailAlert();
      });
  }, []);

  function onSubmit(data) {
    UsersApiService.updateUserInfo({
      email: data.email,
      fullName: data.fullName,
    })
      .then(() => {
        reset({
          email: data.email,
          fullName: data.fullName,
        });
        AlertsService.showAlert("User Info successfully updated", ALERT_SEVERITIES.SUCCESS);
      })
      .catch((error) => {
        AlertsService.showAlert(error);
      });
  }

  function onVerifyEmailClick() {
    UsersApiService.sendVerificationCodeEmail()
      .then(() => {
        navigate(VERIFY_CODE_LINK, { state: { email: getValues().email } });
      })
      .catch((error) => {
        AlertsService.showAlert(error);
      });
  }

  return (
    <div className="profile">
      <h1>Profile info</h1>
      <AppDialog {...dialog} open={openDialog} setOpen={setOpenDialog} />
      <form className="profile__form" onSubmit={handleSubmit(onSubmit)}>
        <AppTextField
          className="profile__input"
          name="email"
          control={control}
          variant="outlined"
          label={`Email${!isActive ? " (unverified)" : ""}`}
          helperText={errors.email?.message}
        />
        <AppTextField
          className="profile__input"
          name="fullName"
          control={control}
          variant="outlined"
          label="Full Name"
          helperText={errors.fullName?.message}
        />
        <Stack spacing={4} marginTop={2} direction="row">
          {!isActive && (
            <Button
              className="button_large button_black-outlined profile__button"
              type="button"
              onClick={onVerifyEmailClick}
            >
              Verify Email
            </Button>
          )}
          <Button className="button_large button_black-outlined profile__button" type="submit">
            Update Profile Info
          </Button>
          <AppLink className="profile__button" to={UPDATE_PASSWORD_LINK}>
            <Button className="button_large button_black-outlined profile__button">Update Password</Button>
          </AppLink>
          <Button className="button_large button_red-outlined profile__button" type="button" onClick={onLogoutClick}>
            Logout
          </Button>
          <Button className="button_large button_red profile__button" type="button" onClick={onDeleteAccountClick}>
            Delete account
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default Profile;

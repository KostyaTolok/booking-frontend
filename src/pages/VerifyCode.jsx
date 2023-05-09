import { yupResolver } from "@hookform/resolvers/yup";
import { Box, FormHelperText } from "@mui/material";
import Button from "components/common/Button";
import Form from "components/common/Form";
import { ALERT_SEVERITIES } from "constants/enums";
import { HOME_LINK } from "constants/links";
import { RESEND_EMAIL_SECONDS } from "constants/time";
import { CODE_LENGTH } from "constants/validation";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import AlertsService from "services/AlertsService";
import { UsersApiService } from "services/UsersApiService";
import * as yup from "yup";

const codeValidationSchema = yup.object({
  code: yup.number().required("Verification code is required").typeError("Verification code can contain only numbers"),
});

function VerifyCode() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
    },
    resolver: yupResolver(codeValidationSchema),
    mode: "onChange",
  });
  const [resendTime, setResendTime] = useState(RESEND_EMAIL_SECONDS);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const navigate = useNavigate();
  const timerRef = useRef(resendTime);
  const location = useLocation();
  const { email } = location.state;

  function startResendTimer() {
    setResendTime(RESEND_EMAIL_SECONDS);
    timerRef.current = RESEND_EMAIL_SECONDS;

    let interval = setInterval(() => {
      timerRef.current -= 1;

      if (timerRef.current <= 0) {
        clearInterval(interval);
        setIsResendDisabled(false);
      } else {
        setResendTime(timerRef.current);
      }
    }, 1000);
  }

  useEffect(() => {
    startResendTimer();
  }, []);

  function resendCode() {
    UsersApiService.sendVerificationCodeEmail()
      .then(() => {
        startResendTimer();
        AlertsService.showAlert(
          `Email with verification code was successfully resent to ${email}`,
          ALERT_SEVERITIES.SUCCESS
        );
      })
      .catch((error) => {
        AlertsService.showAlert(error);
      });
  }

  function onSubmit(data) {
    startResendTimer();
    UsersApiService.verifyEmail(data.code)
      .then(() => {
        navigate(HOME_LINK);
      })
      .catch((error) => {
        AlertsService.showAlert(error);
      });
  }
  return (
    <Form
      title="Verify Code"
      subtitle={`We just sent a 4-digit verification code to ${email}. Enter the code in the box below to continue.`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="code"
        control={control}
        render={({ field }) => (
          <Box>
            <MuiOtpInput
              sx={{ gap: 4.4 }}
              TextFieldsProps={{ hiddenLabel: true, variant: "filled", InputProps: { disableUnderline: true } }}
              className="form__input"
              {...field}
              length={CODE_LENGTH}
            />
            {errors.code?.message && <FormHelperText error>{errors.code?.message}</FormHelperText>}
          </Box>
        )}
      />
      <Button
        id="resend-button"
        className={`button_large button_grey-outlined form__button ${isResendDisabled && "button_disabled"}`}
        type="button"
        disabled={isResendDisabled}
        onClick={resendCode}
      >
        Resend Code {isResendDisabled && `(${resendTime}s)`}
      </Button>
      <Button className="button_large button_orange form__button" type="submit">
        Next
      </Button>
    </Form>
  );
}

export default VerifyCode;

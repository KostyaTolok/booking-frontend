import { SET_ALERT, CLOSE_ALERT } from "redux/constants";

export function setAlert(severity, message) {
  return {
    type: SET_ALERT,
    message: message,
    severity: severity,
  };
}

export function closeAlert() {
  return {
    type: CLOSE_ALERT,
  };
}

import { ALERT_SEVERITIES } from "constants/enums";
import { setAlert } from "redux/actions/alertActions";
import store from "redux/store";

export const SERVER_ERROR_500_MESSAGE = "Internal Server Error";
export const SERVER_ERROR_502_MESSAGE = "Bad Gateway Error";

class AlertsService {
  static showAlert(alert, severity = ALERT_SEVERITIES.ERROR) {
    if (severity === ALERT_SEVERITIES.ERROR) {
      alert = this.getAlertMessage(alert);
    }
    store.dispatch(setAlert(severity, alert));
  }

  static getAlertMessage(error) {
    let alertMessage = null;

    if (error == null) {
      return "";
    }

    if (error.response?.data?.message) {
      alertMessage = error.response.data.message;
    } else if (error.response?.status === 502) {
      alertMessage = SERVER_ERROR_502_MESSAGE;
    } else if (error.response?.status === 500) {
      alertMessage = SERVER_ERROR_500_MESSAGE;
    } else if (error.response?.data?.detail) {
      if (error.response?.data?.detail?.length && error.response?.data?.detail[0]?.msg) {
        alertMessage = error.response.data.detail[0].msg;
      } else {
        alertMessage = error.response.data.detail;
      }
    } else if (error.message) {
      alertMessage = error.message;
    } else {
      alertMessage = error;
    }

    return alertMessage;
  }
}

export default AlertsService;

import { ALERT_SEVERITIES } from "constants/enums";
import { CLOSE_ALERT, SET_ALERT } from "redux/constants";

const INITIAL_STATE = {
  open: false,
  message: "",
  severity: ALERT_SEVERITIES.ERROR,
};

function alertReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        message: action.message,
        severity: action.severity,
        open: true,
      };
    case CLOSE_ALERT:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
}

export default alertReducer;

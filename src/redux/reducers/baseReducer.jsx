import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";

const baseReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
});

export default baseReducer;

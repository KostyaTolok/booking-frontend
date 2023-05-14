import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import hotelsListReducer from "./hotelsListReducer";
import tooltipsReducer from "./tooltipsReducer";

const baseReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  hotelsList: hotelsListReducer,
  tooltips: tooltipsReducer,
});

export default baseReducer;

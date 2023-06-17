import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import hotelsListReducer from "./hotelsListReducer";
import tooltipsReducer from "./tooltipsReducer";
import roomsListReducer from "./roomsListReducer";
import notificationsReducer from "./notificationsReducer";

const baseReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  hotelsList: hotelsListReducer,
  tooltips: tooltipsReducer,
  roomsList: roomsListReducer,
  notifications: notificationsReducer,
});

export default baseReducer;

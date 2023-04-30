import { combineReducers } from "redux";
import authReducer from "./authReducer";

const baseReducer = combineReducers({
  auth: authReducer,
});

export default baseReducer;

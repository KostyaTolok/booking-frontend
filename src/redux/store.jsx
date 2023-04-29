import { configureStore } from "@reduxjs/toolkit";
import baseReducer from "redux/reducers/baseReducer";
// import authReducer from "redux/reducers/authReducer";

const store = configureStore({ reducer: baseReducer });

export default store;

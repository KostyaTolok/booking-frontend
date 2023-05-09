import { configureStore } from "@reduxjs/toolkit";
import baseReducer from "redux/reducers/baseReducer";

const store = configureStore({ reducer: baseReducer });

export default store;

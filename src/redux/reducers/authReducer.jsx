import { SET_FULL_NAME, SET_IS_AUTHENTICATED_STATE } from "redux/constants";

const INITIAL_STATE = {
  isAuthenticated: false,
  fullName: "",
  refreshToken: "",
};

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_IS_AUTHENTICATED_STATE:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };
    case SET_FULL_NAME:
      return {
        ...state,
        accessToken: action.fullName,
      };
    default:
      return state;
  }
}

export default authReducer;

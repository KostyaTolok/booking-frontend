import { SET_FULL_NAME, SET_IS_AUTHENTICATED_STATE } from "redux/constants";

export function setIsAuthenticated(isAuthenticated) {
  return {
    type: SET_IS_AUTHENTICATED_STATE,
    isAuthenticated: isAuthenticated,
  };
}

export function setFullName(fullName) {
  return {
    type: SET_FULL_NAME,
    fullName: fullName,
  };
}

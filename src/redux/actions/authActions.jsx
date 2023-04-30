import { SET_IS_AUTHENTICATED_STATE } from "redux/constants";

function setIsAuthenticated(isAuthenticated) {
  return {
    type: SET_IS_AUTHENTICATED_STATE,
    isAuthenticated: isAuthenticated,
  };
}

export default setIsAuthenticated;

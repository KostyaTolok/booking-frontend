import { SET_IS_AUTHENTICATED_STATE } from "redux/constants";

const INITIAL_STATE = {
  isAuthenticated: true,
};

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_IS_AUTHENTICATED_STATE:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };
    default:
      return state;
  }
}

export default authReducer;

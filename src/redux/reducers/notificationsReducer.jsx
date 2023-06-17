import { HAS_NOTIFICATIONS } from "redux/constants";

const INITIAL_STATE = {
  hasNotifications: false,
};

function notificationsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case HAS_NOTIFICATIONS:
      return {
        ...state,
        hasNotifications: action.hasNotifications,
      };
    default:
      return state;
  }
}

export default notificationsReducer;

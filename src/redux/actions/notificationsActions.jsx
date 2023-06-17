import { HAS_NOTIFICATIONS } from "redux/constants";

export function setHasNotifications(hasNotifications) {
  return {
    hasNotifications: hasNotifications,
    type: HAS_NOTIFICATIONS,
  };
}

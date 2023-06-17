import NotificationsListItem from "./NotificationsListItem";
import { NOTIFICATIONS_KEY } from "constants/localStorage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setHasNotifications } from "redux/actions/notificationsActions";
import { LocalStorageService } from "services/LocalStorageService";
import "./NotificationsList.scss";

function NotificationsList() {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    dispatch(setHasNotifications(false));
    let notifications = LocalStorageService.getArray(NOTIFICATIONS_KEY);
    setNotifications(notifications);
  }, []);

  function onCrossIconClick(index) {
    let tempNotifications = [...notifications];
    tempNotifications.splice(index, 1);
    LocalStorageService.removeNotification(index);
    setNotifications(tempNotifications);
  }

  return (
    <div className="notifications-list">
      <h1 className="notifications-list__title">Notifications</h1>
      {notifications.length !== 0 ? (
        notifications.map((notification, index) => (
          <NotificationsListItem itemId={index} key={index} {...notification} onCrossIconClick={onCrossIconClick} />
        ))
      ) : (
        <h2>You don&apos;t have any notifications</h2>
      )}
    </div>
  );
}

export default NotificationsList;

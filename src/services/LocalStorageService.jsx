import { NOTIFICATIONS_KEY, RECENT_SEARCHES_KEY, RECENT_VIEWS_KEY } from "constants/localStorage";
import { MAX_SEARCHS_LIST_LENGTH, MAX_VIEWS_LIST_LENGTH, NOTIFICATIONS_HISTORY_MAX_LENGTH } from "constants/values";
import { setHasNotifications } from "redux/actions/notificationsActions";
import store from "redux/store";

export class LocalStorageService {
  static setItem(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  static getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static getArray(key) {
    return this.getItem(key) || [];
  }

  static addRecentSearch(item) {
    let searches = this.getArray(RECENT_SEARCHES_KEY);

    if (searches.length !== 0) {
      let searchList = searches.slice(0, MAX_SEARCHS_LIST_LENGTH - 1);
      searchList.splice(0, 0, item);
      this.setItem(RECENT_SEARCHES_KEY, searchList);
    } else {
      searches.push(item);
      this.setItem(RECENT_SEARCHES_KEY, searches);
    }
  }

  static removeRecentSearch(index) {
    let searches = this.getArray(RECENT_SEARCHES_KEY);

    if (searches.length > 0 && index < searches.length) {
      let tempSearches = [...searches];
      tempSearches.splice(index, 1);
      this.setItem(RECENT_SEARCHES_KEY, tempSearches);
    }
  }

  static addRecentView(item) {
    let views = this.getArray(RECENT_VIEWS_KEY);

    if (views.length !== 0) {
      let viewsList = views.slice(0, MAX_VIEWS_LIST_LENGTH - 1);
      viewsList.splice(0, 0, item);
      this.setItem(RECENT_VIEWS_KEY, viewsList);
    } else {
      views.push(item);
      this.setItem(RECENT_VIEWS_KEY, views);
    }
  }

  static removeRecentView(index) {
    let views = this.getArray(RECENT_VIEWS_KEY);

    if (views.length > 0 && index < views.length) {
      let tempViews = [...views];
      tempViews.splice(index, 1);
      this.setItem(RECENT_VIEWS_KEY, tempViews);
    }
  }

  static addPaymentNotification({
    message,
    apartmentId,
    apartmentName,
    startDate,
    endDate,
    succeededAt,
    price,
    isNew,
  }) {
    let notifications = this.getArray(NOTIFICATIONS_KEY);

    let paymentNotification = {
      message: message,
      apartmentId: apartmentId,
      apartmentName: apartmentName,
      startDate: startDate,
      endDate: endDate,
      succeededAt: succeededAt,
      price: price,
      isNew: isNew,
    };

    if (notifications.length !== 0) {
      let notificationsList = notifications.slice(0, NOTIFICATIONS_HISTORY_MAX_LENGTH - 1);
      notificationsList.splice(0, 0, paymentNotification);
      this.setItem(NOTIFICATIONS_KEY, notificationsList);
    } else {
      notifications.push(paymentNotification);
      this.setItem(NOTIFICATIONS_KEY, notifications);
    }
  }

  static removeNotification(index) {
    let notifications = this.getArray(NOTIFICATIONS_KEY);

    if (notifications.length > 0 && index < notifications.length) {
      let tempNotifications = [...notifications];
      tempNotifications.splice(index, 1);
      this.setItem(NOTIFICATIONS_KEY, tempNotifications);
    }
  }

  static markAsReadAllNotifications() {
    store.dispatch(setHasNotifications(false));
    let notifications = this.getArray(NOTIFICATIONS_KEY);
    let tempNotifications = [];

    notifications.forEach((notification) => {
      notification.isNew = false;
      tempNotifications.push(notification);
    });

    this.storeData(NOTIFICATIONS_KEY, tempNotifications);
  }

  static checkForNewNotifications() {
    let notifications = this.getData(NOTIFICATIONS_KEY);

    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].isNew) {
        store.dispatch(setHasNotifications(true));
        break;
      }
    }
  }
}

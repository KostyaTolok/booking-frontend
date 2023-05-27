import { RECENT_SEARCHES_KEY, RECENT_VIEWS_KEY } from "constants/localStorage";
import { MAX_SEARCHS_LIST_LENGTH, MAX_VIEWS_LIST_LENGTH } from "constants/values";

export class LocalStorageService {
  static setItem(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  static getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static getRecentSearches() {
    return this.getItem(RECENT_SEARCHES_KEY) || [];
  }

  static addRecentSearch(item) {
    let searches = this.getRecentSearches();

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
    let searches = this.getRecentSearches();

    if (searches.length > 0 && index < searches.length) {
      let tempSearches = [...searches];
      tempSearches.splice(index, 1);
      this.setItem(RECENT_SEARCHES_KEY, tempSearches);
    }
  }

  static getRecentViews() {
    return this.getItem(RECENT_VIEWS_KEY) || [];
  }

  static addRecentView(item) {
    let views = this.getRecentViews();

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
    let views = this.getRecentViews();

    if (views.length > 0 && index < views.length) {
      let tempViews = [...views];
      tempViews.splice(index, 1);
      this.setItem(RECENT_VIEWS_KEY, tempViews);
    }
  }
}

import { RECENT_SEARCHES_KEY } from "constants/localStorage";
import { MAX_SEARCHS_LIST_LENGTH } from "constants/values";

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
}

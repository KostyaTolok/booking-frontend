import { useEffect, useState } from "react";
import "./RecentSearches.scss";
import RecentSearchesItem from "./RecentSearchesItem";
import ScrollList from "components/common/ScrollList";
import { LocalStorageService } from "services/LocalStorageService";
import { RECENT_SEARCHES_KEY } from "constants/localStorage";

function RecentSearches() {
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    let searches = LocalStorageService.getArray(RECENT_SEARCHES_KEY);
    setSearches(searches);
  }, []);

  function onCrossIconClick(event, index) {
    event.stopPropagation();
    let tempSearches = [...searches];
    tempSearches.splice(index, 1);
    LocalStorageService.removeRecentSearch(index);
    setSearches(tempSearches);
  }

  return (
    <>
      {searches.length !== 0 && (
        <div className="recent-searches-wrapper">
          <ScrollList title="Recent Searches">
            {searches.map((search, index) => (
              <RecentSearchesItem itemId={index} key={index} onCrossIconClick={onCrossIconClick} {...search} />
            ))}
          </ScrollList>
        </div>
      )}
    </>
  );
}

export default RecentSearches;

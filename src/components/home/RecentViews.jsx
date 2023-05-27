import { useEffect, useState } from "react";
import ScrollList from "components/common/ScrollList";
import "./RecentViews.scss";
import RecentViewsItem from "./RecentViewsItem";
import { LocalStorageService } from "services/LocalStorageService";

function RecentViews() {
  const [views, setViews] = useState([]);

  useEffect(() => {
    let views = LocalStorageService.getRecentViews();
    setViews(views);
  }, []);

  function onCrossIconClick(event, index) {
    event.preventDefault();
    let tempViews = [...views];
    tempViews.splice(index, 1);
    LocalStorageService.removeRecentView(index);
    setViews(tempViews);
  }

  return (
    <>
      {views.length !== 0 && (
        <div className="recent-views-wrapper">
          <ScrollList title="Recently Viewed">
            {views.map((views, index) => (
              <RecentViewsItem itemId={index} key={index} onCrossIconClick={onCrossIconClick} {...views} />
            ))}
          </ScrollList>
        </div>
      )}
    </>
  );
}

export default RecentViews;

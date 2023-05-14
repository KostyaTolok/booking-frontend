import { useState } from "react";
import ScrollList from "components/common/ScrollList";
import "./RecentViews.scss";
import RecentViewsItem from "./RecentViewsItem";

function RecentViews() {
  const [items] = useState([]);

  return (
    <>
      {items.length !== 0 && (
        <div className="recent-views-wrapper">
          <ScrollList title="Recently Viewed">
            {items.map((item) => (
              <RecentViewsItem itemId={item.id} key={item.id} {...item} />
            ))}
          </ScrollList>
        </div>
      )}
    </>
  );
}

export default RecentViews;

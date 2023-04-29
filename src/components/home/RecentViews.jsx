import { useState } from "react";
import ScrollList from "components/common/ScrollList";
import "./RecentViews.scss";
import placeholder from "images/placeholder.png";
import RecentViewsItem from "./RecentViewsItem";

function RecentViews() {
  const getItems = () =>
    Array(5)
      .fill(0)
      .map((_, ind) => ({
        id: `${ind}`,
        title: "Hotel Name Chi Knickerbocker",
        subtitle: "Chicago",
        rating: "7.6",
        image: placeholder,
      }));

  const [items] = useState(getItems);

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

import { useState } from "react";
import "./RecentSearches.scss";
import RecentSearchesItem from "./RecentSearchesItem";
import ScrollList from "components/common/ScrollList";

function RecentSearches() {
  const getItems = () =>
    Array(5)
      .fill(0)
      .map((_, ind) => ({
        id: `${ind}`,
        title: "Chicago",
        subtitle: "Sep 26 - Sep 27",
      }));

  const [items] = useState(getItems);

  return (
    <>
      {items.length !== 0 && (
        <div className="recent-searches-wrapper">
          <ScrollList title="Recent Searches">
            {items.map((item) => (
              <RecentSearchesItem itemId={item.id} key={item.id} {...item} />
            ))}
          </ScrollList>
        </div>
      )}
    </>
  );
}

export default RecentSearches;

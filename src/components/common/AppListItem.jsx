import AppCard from "./AppCard";
import "./AppListItem.scss";

function AppListItem(props) {
  return <AppCard className="list-item">{props.children}</AppCard>;
}

export default AppListItem;

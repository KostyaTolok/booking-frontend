import { Link } from "react-router-dom";
import "./RecentSearchesItem.scss";
import Card from "components/common/Card";

function RecentSearchesItem(props) {
  return (
    <Link to="/">
      <Card className="card recent-searches-item">
        <p className="recent-searches-item__title">{props.title}</p>
        <p className="recent-searches-item__subtitle">{props.subtitle}</p>
      </Card>
    </Link>
  );
}

export default RecentSearchesItem;

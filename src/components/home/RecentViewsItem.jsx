import Card from "components/common/Card";
import "./RecentViewsItem.scss";
import Badge from "components/common/Badge";
import { Link } from "react-router-dom";

function RecentViewsItem(props) {
  return (
    <Link to="/">
      <Card className="card recent-views-item">
        <img className="recent-views-item__image" src={props.image}></img>
        <div className="recent-views-item__info">
          <p className="recent-views-item__title">{props.title}</p>
          <p className="recent-views-item__subtitle">{props.subtitle}</p>
          <Badge className="recent-views-item__rating">{props.rating}</Badge>
        </div>
      </Card>
    </Link>
  );
}

export default RecentViewsItem;

import AppCard from "components/common/AppCard";
import "./RecentViewsItem.scss";
import Badge from "components/common/Badge";
import { Link } from "react-router-dom";
import { HOTELS_LIST_LINK } from "constants/links";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ORANGE_COLOR } from "constants/colors";

function RecentViewsItem(props) {
  return (
    <Link to={`${HOTELS_LIST_LINK}/${props.id}`}>
      <AppCard className="recent-views-item">
        <img className="recent-views-item__image" src={props.imageUrl}></img>
        <div className="recent-views-item__info">
          <div className="recent-views-item__title-wrapper">
            <p className="recent-views-item__title">{props.name}</p>
            <CloseRoundedIcon
              sx={{ "&:hover": { color: ORANGE_COLOR } }}
              onClick={(event) => props.onCrossIconClick(event, props.itemId)}
            />
          </div>
          <p className="recent-views-item__subtitle">{props.description}</p>
          <Badge className="recent-views-item__rating">{props.rating}</Badge>
        </div>
      </AppCard>
    </Link>
  );
}

export default RecentViewsItem;

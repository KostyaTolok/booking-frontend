import { useNavigate } from "react-router-dom";
import "./RecentSearchesItem.scss";
import AppCard from "components/common/AppCard";
import { DateFormatterService } from "services/DateFormatterService";
import { useDispatch } from "react-redux";
import {
  setDateRange,
  setDestination,
  setHotelNumberOfGuests,
  setHotelNumberOfRooms,
} from "redux/actions/hotelsListActions";
import { HOTELS_LIST_LINK } from "constants/links";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ORANGE_COLOR } from "constants/colors";

function RecentSearchesItem(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(
      setDestination({
        destinationId: props.destinationId,
        destination: props.destination,
      })
    );
    dispatch(setDateRange(props.startDate, props.endDate));
    dispatch(setHotelNumberOfGuests(props.numberOfGuests));
    dispatch(setHotelNumberOfRooms(props.numberOfRooms));
    navigate(HOTELS_LIST_LINK);
  }

  return (
    <AppCard className="recent-searches-item" onClick={handleClick}>
      <div className="recent-searches-item__title-wrapper">
        <p className="recent-searches-item__title">{props.destination}</p>
        <CloseRoundedIcon
          sx={{ "&:hover": { color: ORANGE_COLOR } }}
          onClick={(event) => props.onCrossIconClick(event, props.itemId)}
        />
      </div>
      <p className="recent-searches-item__subtitle">
        {DateFormatterService.toShortDateFormat(new Date(props.startDate))} -{" "}
        {DateFormatterService.toShortDateFormat(new Date(props.endDate))}
      </p>
    </AppCard>
  );
}

export default RecentSearchesItem;

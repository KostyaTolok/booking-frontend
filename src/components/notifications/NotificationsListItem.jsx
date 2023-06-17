import AppListItem from "components/common/AppListItem";
import { DateFormatterService } from "services/DateFormatterService";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ORANGE_COLOR } from "constants/colors";

function NotificationsListItem(props) {
  return (
    <AppListItem>
      <div className="list-item__info">
        <div className="list-item__name-wrapper">
          <p className="list-item__name_large">Successful payment</p>
          <CloseRoundedIcon
            sx={{ "&:hover": { color: ORANGE_COLOR } }}
            onClick={() => props.onCrossIconClick(props.itemId)}
          />
        </div>
        <p className="list-item__subtitle">
          Apartment “{props.apartmentName}” was booked successfully from{" "}
          {DateFormatterService.toFullDateFormat(new Date(props.startDate))} to{" "}
          {DateFormatterService.toFullDateFormat(new Date(props.endDate))} for {props.price}$
        </p>
        <p className="list-item__subtitle">{DateFormatterService.toFullDateFormat(new Date(props.succeededAt))}</p>
      </div>
    </AppListItem>
  );
}

export default NotificationsListItem;

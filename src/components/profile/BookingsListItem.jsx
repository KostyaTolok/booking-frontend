import AppListItem from "components/common/AppListItem";
import Button from "components/common/Button";
import { DateFormatterService } from "services/DateFormatterService";

function BookingsListItem(props) {
  return (
    <AppListItem>
      <div className="list-item__info">
        <p className="list-item__name_large">{props.hotel_name}</p>
        <p className="list-item__subtitle">{props.room_name}</p>
        <p className="list-item__subtitle">
          {DateFormatterService.toFullDateFormat(new Date(props.start_date))} -{" "}
          {DateFormatterService.toFullDateFormat(new Date(props.end_date))}
        </p>
        <Button
          className="button_large button_orange button_rounded list-item__button"
          onClick={() => props.handleShowQrClick(props.room_id, props.id)}
        >
          Show QR Code
        </Button>
      </div>
    </AppListItem>
  );
}

export default BookingsListItem;

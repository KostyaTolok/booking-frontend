import { Stack } from "@mui/material";
import "./AsideSearchForm.scss";
import Button from "../common/Button";
import DestinationSelect from "components/search/DestinationSelect";
import CalendarRangePicker from "components/search/CalendarRangePicker";
import GuestsModal from "components/search/GuestsModal";
import { useDispatch, useSelector } from "react-redux";
import { setDatesTooltipOpen, setDestinationTooltipOpen } from "redux/actions/tooltipsActions";
import { LocalStorageService } from "services/LocalStorageService";
import { useLocation, useNavigate } from "react-router-dom";
import { HOTELS_LIST_LINK } from "constants/links";

function AsideSearchForm(props) {
  const hotelsList = useSelector((store) => store.hotelsList);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  function handleSearchClick() {
    if (hotelsList.destination === "") {
      dispatch(setDestinationTooltipOpen(true));
    } else if (hotelsList.startDate === "" || hotelsList.endDate === "") {
      dispatch(setDatesTooltipOpen(true));
    } else {
      dispatch(setDestinationTooltipOpen(false));
      dispatch(setDatesTooltipOpen(false));
      LocalStorageService.addRecentSearch({
        destinationId: hotelsList.destinationId,
        destination: hotelsList.destination,
        numberOfGuests: hotelsList.numberOfGuests,
        numberOfRooms: hotelsList.numberOfRooms,
        startDate: hotelsList.startDate,
        endDate: hotelsList.endDate,
      });

      if (location.pathname === HOTELS_LIST_LINK) {
        props.refreshHotels();
      } else {
        navigate(HOTELS_LIST_LINK);
      }
    }
  }

  return (
    <div className="aside-search-form-wrapper">
      <form className="aside-search-form">
        <Stack direction={{ xs: "row", md: "column" }} spacing={1}>
          <div className="aside-search-form__input-group">
            <label className="aside-search-form__label">Destination</label>
            <DestinationSelect aside />
          </div>
          <div className="aside-search-form__input-group">
            <label className="aside-search-form__label">Dates</label>
            <CalendarRangePicker aside />
          </div>
          <div className="aside-search-form__input-group">
            <label className="aside-search-form__label">Guests</label>
            <GuestsModal aside />
          </div>
        </Stack>
        <Button className="aside-search-form__button button_white" type="button" onClick={handleSearchClick}>
          Search
        </Button>
      </form>
    </div>
  );
}

export default AsideSearchForm;

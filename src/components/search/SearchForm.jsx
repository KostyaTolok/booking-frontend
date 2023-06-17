import { Link } from "react-router-dom";
import "./SearchForm.scss";
import SearchInputs from "./SearchInputs";
import Button from "components/common/Button";
import { HOTELS_LIST_LINK } from "constants/links";
import { setDatesTooltipOpen, setDestinationTooltipOpen } from "redux/actions/tooltipsActions";
import { useDispatch, useSelector } from "react-redux";
import { LocalStorageService } from "services/LocalStorageService";
import { Grid } from "@mui/material";

function SearchForm() {
  const hotelsList = useSelector((store) => store.hotelsList);
  const dispatch = useDispatch();

  function handleSearchClick(event) {
    if (hotelsList.destination === "") {
      dispatch(setDestinationTooltipOpen(true));
      event.preventDefault();
    } else if (hotelsList.startDate === "" || hotelsList.endDate === "") {
      dispatch(setDatesTooltipOpen(true));
      event.preventDefault();
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
    }
  }

  return (
    <form className="search-form">
      <h1 className="search-form__heading">Find your next stay</h1>
      <p className="search-form__subtitle">Search deals on hotels, homes, and much more...</p>
      <div className="search-form__wrapper">
        <Grid container columnSpacing={"4.0625rem"} rowSpacing={"1rem"}>
          <Grid item xs={12} md={9}>
            <SearchInputs />
          </Grid>
          <Grid item xs={12} md={3}>
            <Link to={HOTELS_LIST_LINK} onClick={handleSearchClick}>
              <Button className="button_medium button_white search-form__button">Search</Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    </form>
  );
}

export default SearchForm;

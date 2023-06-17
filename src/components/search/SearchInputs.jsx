import "./SearchInputs.scss";
import CalendarRangePicker from "./CalendarRangePicker";
import GuestsModal from "./GuestsModal";
import DestinationSelect from "./DestinationSelect";
import { Divider } from "@mui/material";

function SearchInputs() {
  return (
    <div className="search-inputs">
      <DestinationSelect />
      <Divider orientation="vertical" variant="middle" flexItem className="search-inputs__divider" />
      <CalendarRangePicker />
      <Divider orientation="vertical" variant="middle" flexItem className="search-inputs__divider" />
      <GuestsModal />
    </div>
  );
}

export default SearchInputs;

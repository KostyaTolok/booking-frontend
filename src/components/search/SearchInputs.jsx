import "./SearchInputs.scss";
import CalendarRangePicker from "./CalendarRangePicker";
import GuestsModal from "./GuestsModal";
import DestinationSelect from "./DestinationSelect";
import { Divider } from "@mui/material";

function SearchInputs() {
  return (
    <div className="search-inputs">
      <DestinationSelect />
      <Divider orientation="vertical" variant="middle" flexItem sx={{ marginRight: 6.625 }} />
      <CalendarRangePicker />
      <Divider orientation="vertical" variant="middle" flexItem sx={{ marginRight: 6.625 }} />
      <GuestsModal />
    </div>
  );
}

export default SearchInputs;

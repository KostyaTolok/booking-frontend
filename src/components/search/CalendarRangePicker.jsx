import { DateRange } from "react-date-range";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./CalendarRangePicker.scss";
import SearchTextField from "./SearchTextField";
import { ORANGE_COLOR } from "constants/colors";
import AppPopper from "components/common/AppPopper";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setDateRange } from "redux/actions/hotelsListActions";
import { setDatesTooltipOpen } from "redux/actions/tooltipsActions";
import { DateFormatterService } from "services/DateFormatterService";

function CalendarRangePicker(props) {
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: new Date(""),
      color: ORANGE_COLOR,
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const startDate = useSelector((store) => store.hotelsList.startDate);
  const endDate = useSelector((store) => store.hotelsList.endDate);
  const tooltipOpen = useSelector((store) => store.tooltips.datesTooltipOpen);
  const [anchorEl, setAnchorEl] = useState(false);

  useEffect(() => {
    if (startDate && endDate) {
      setRange([{ ...range[0], startDate: new Date(startDate), endDate: new Date(endDate) }]);
    }
  }, [startDate, endDate]);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
    dispatch(setDatesTooltipOpen(false));
    setOpen(true);
  }

  function handleChange(selection) {
    dispatch(setDateRange(selection[0].startDate.toString(), selection[0].endDate.toString()));
    setRange(selection);
  }

  return (
    <div className="range-picker">
      <SearchTextField
        readOnly
        value={
          range[0].startDate & range[0].endDate
            ? `${DateFormatterService.toShortDateFormat(
                new Date(startDate)
              )} - ${DateFormatterService.toShortDateFormat(new Date(endDate))}`
            : ""
        }
        label={!props.aside ? "Dates" : undefined}
        hiddenLabel={props.aside}
        onClick={handleClick}
        tooltip={"To start searching, enter a start and and date of your booking"}
        tooltipOpen={tooltipOpen}
      />
      <AppPopper open={open} setOpen={setOpen} anchorEl={anchorEl}>
        <Box>
          <DateRange
            onChange={(item) => handleChange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            minDate={new Date()}
            ranges={range}
            months={1}
            direction="horizontal"
          />
        </Box>
      </AppPopper>
    </div>
  );
}

export default CalendarRangePicker;

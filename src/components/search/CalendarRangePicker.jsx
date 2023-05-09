import { DateRange } from "react-date-range";
import { useState } from "react";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./CalendarRangePicker.scss";
import Modal from "components/common/Modal";
import SearchTextField from "./SearchTextField";
import { RANGE_PICKER_COLOR } from "constants/colors";

function CalendarRangePicker() {
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: new Date(""),
      color: RANGE_PICKER_COLOR,
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);

  return (
    <div className="range-picker">
      <SearchTextField
        readOnly
        value={
          range[0].startDate & range[0].endDate
            ? `${format(range[0].startDate, "dd MMM")} - ${format(range[0].endDate, "dd MMM")}`
            : ""
        }
        label="Dates"
        onClick={() => setOpen((open) => !open)}
      />
      <Modal open={open} setOpen={setOpen}>
        <DateRange
          onChange={(item) => setRange([item.selection])}
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          minDate={new Date()}
          ranges={range}
          months={1}
          direction="horizontal"
          className="range-picker__calendar"
        />
      </Modal>
    </div>
  );
}

export default CalendarRangePicker;

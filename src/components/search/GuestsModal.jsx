import { useState } from "react";
import "./GuestsModal.scss";
import QuantityPicker from "components/common/QuantityPicker";
import SearchTextField from "./SearchTextField";
import AppPopper from "components/common/AppPopper";
import { useDispatch, useSelector } from "react-redux";
import { setHotelNumberOfGuests, setHotelNumberOfRooms } from "redux/actions/hotelsListActions";

function GuestsModal(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const rooms = useSelector((store) => store.hotelsList.numberOfRooms);
  const guests = useSelector((store) => store.hotelsList.numberOfGuests);
  const [anchorEl, setAnchorEl] = useState(false);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  }

  return (
    <div className="guests-modal-wrapper">
      <SearchTextField
        readOnly
        value={guests | rooms ? `${rooms} rooms - ${guests} guests` : ""}
        label={!props.aside ? "Rooms" : undefined}
        hiddenLabel={props.aside}
        onClick={handleClick}
      />
      <AppPopper open={open} setOpen={setOpen} anchorEl={anchorEl}>
        <div className="guests-modal">
          <div className="guests-modal__input-group">
            <label className="guests-modal__quantity-label">Rooms: </label>
            <QuantityPicker
              minValue={0}
              maxValue={10}
              defaultValue={rooms}
              onChange={(value) => dispatch(setHotelNumberOfRooms(value))}
            />
          </div>
          <div className="guests-modal__input-group">
            <label className="guests-modal__quantity-label">Guests: </label>
            <QuantityPicker
              minValue={0}
              maxValue={10}
              defaultValue={guests}
              onChange={(value) => dispatch(setHotelNumberOfGuests(value))}
            />
          </div>
        </div>
      </AppPopper>
    </div>
  );
}

export default GuestsModal;

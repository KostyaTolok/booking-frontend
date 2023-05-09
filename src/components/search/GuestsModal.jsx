import Modal from "components/common/Modal";
import { useState } from "react";
import "./GuestsModal.scss";
import QuantityPicker from "components/common/QuantityPicker";
import SearchTextField from "./SearchTextField";

function GuestsModal() {
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState(0);
  const [guests, setGuests] = useState(0);

  return (
    <div className="guests-modal-wrapper">
      <SearchTextField
        readOnly
        value={guests | rooms ? `${rooms} rooms - ${guests} guests` : ""}
        label="Rooms"
        onClick={() => setOpen(!open)}
      />
      <Modal open={open} setOpen={setOpen}>
        <div className="guests-modal">
          <div className="guests-modal__input-group">
            <label className="guests-modal__quantity-label">Rooms: </label>
            <QuantityPicker minValue={0} maxValue={10} defaultValue={rooms} onChange={(value) => setRooms(value)} />
          </div>
          <div className="guests-modal__input-group">
            <label className="guests-modal__quantity-label">Guests: </label>
            <QuantityPicker minValue={0} maxValue={10} defaultValue={guests} onChange={(value) => setGuests(value)} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default GuestsModal;

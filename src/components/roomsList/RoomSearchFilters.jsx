import { MAX_ROOM_PRICE, MIN_ROOM_PRICE } from "constants/values";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Divider, FormControlLabel, Slider } from "@mui/material";
import {
  setIsRoomKitchenPresent,
  setIsRoomWashingMachinePresent,
  setRoomNumberOfBeds,
  setRoomNumberOfRooms,
  setRoomsPriceRange,
} from "redux/actions/roomsActions";
import QuantityPicker from "components/common/QuantityPicker";
import AppSearchFilters from "components/common/AppSearchFilters";

function RoomSearchFilters(props) {
  const dispatch = useDispatch();
  const lowPrice = useSelector((store) => store.roomsList.lowPrice);
  const highPrice = useSelector((store) => store.roomsList.highPrice);
  const isKitchenPresent = useSelector((store) => store.roomsList.isKitchenPresent);
  const isWashingMachinePresent = useSelector((store) => store.roomsList.isWashingMachinePresent);
  const rooms = useSelector((store) => store.roomsList.numberOfRooms);
  const beds = useSelector((store) => store.roomsList.numberOfBeds);

  const [localPriceRange, setLocalPriceRange] = useState([MIN_ROOM_PRICE, MAX_ROOM_PRICE]);

  function handlePriceRangeChange(event, value) {
    setLocalPriceRange(value);
  }

  function handlePriceRangeChangeCommited(event, value) {
    dispatch(setRoomsPriceRange({ lowPrice: value[0], highPrice: value[1] }));
    props.refreshRooms();
  }

  useEffect(() => {
    setLocalPriceRange([lowPrice, highPrice]);
  }, []);
  return (
    <AppSearchFilters>
      <p className="search-filters__title">Price range</p>
      <div className="price-range-wrapper">
        <p className="search-filters__subtitle">{`${lowPrice}$ - ${highPrice}$`}</p>
        <Slider
          min={MIN_ROOM_PRICE}
          max={MAX_ROOM_PRICE}
          value={localPriceRange}
          onChange={handlePriceRangeChange}
          onChangeCommitted={handlePriceRangeChangeCommited}
          valueLabelDisplay="auto"
          disableSwap
          color="warning"
          sx={{ marginTop: 1.75 }}
        />
      </div>
      <Divider sx={{ marginTop: 2, marginBottom: 2.5 }} />
      <div className="search-filters__input-group">
        <label>Rooms: </label>
        <QuantityPicker
          minValue={0}
          maxValue={10}
          defaultValue={rooms}
          onChange={(value) => {
            dispatch(setRoomNumberOfRooms(value));
            props.refreshRooms();
          }}
        />
      </div>
      <div className="search-filters__input-group">
        <label>Beds: </label>
        <QuantityPicker
          minValue={0}
          maxValue={10}
          defaultValue={beds}
          onChange={(value) => {
            dispatch(setRoomNumberOfBeds(value));
            props.refreshRooms();
          }}
        />
      </div>
      <Divider sx={{ marginTop: 2.5, marginBottom: 2.5 }} />
      <p className="search-filters__title">Facilities</p>
      <FormControlLabel
        control={
          <Checkbox
            sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
            checked={isKitchenPresent}
            onChange={() => {
              dispatch(setIsRoomKitchenPresent(!isKitchenPresent));
              props.refreshRooms();
            }}
          />
        }
        label="Kitchen"
        labelPlacement="start"
        className="search-filters__checkbox-input"
      />
      <FormControlLabel
        control={
          <Checkbox
            sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
            checked={isWashingMachinePresent}
            onChange={() => {
              dispatch(setIsRoomWashingMachinePresent(!isWashingMachinePresent));
              props.refreshRooms();
            }}
          />
        }
        label="Washing machine"
        labelPlacement="start"
        className="search-filters__checkbox-input"
      />
    </AppSearchFilters>
  );
}

export default RoomSearchFilters;

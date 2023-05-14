import { Checkbox, Divider, FormControlLabel, Paper, Slider } from "@mui/material";
import "./SearchFilters.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { MAX_ROOM_PRICE, MIN_ROOM_PRICE } from "constants/values";
import {
  setIsKitchenPresent,
  setIsWashingMachinePresent,
  setIsWifiPresent,
  setPriceRange,
} from "redux/actions/hotelsListActions";

function SearchFilters(props) {
  const dispatch = useDispatch();
  const lowPrice = useSelector((store) => store.hotelsList.lowPrice);
  const highPrice = useSelector((store) => store.hotelsList.highPrice);
  const isWifiPresent = useSelector((store) => store.hotelsList.isWifiPresent);
  const isKitchenPresent = useSelector((store) => store.hotelsList.isKitchenPresent);
  const isWashingMachinePresent = useSelector((store) => store.hotelsList.isWashingMachinePresent);

  const [localPriceRange, setLocalPriceRange] = useState([MIN_ROOM_PRICE, MAX_ROOM_PRICE]);

  function handlePriceRangeChange(event, value) {
    setLocalPriceRange(value);
  }

  function handlePriceRangeChangeCommited(event, value) {
    dispatch(setPriceRange({ lowPrice: value[0], highPrice: value[1] }));
    props.refreshHotels();
  }

  useEffect(() => {
    setLocalPriceRange([lowPrice, highPrice]);
  }, []);

  return (
    <Paper className="search-filters" variant="outlined" sx={{ paddingY: 0.5, paddingX: 1.25, marginTop: 3.75 }}>
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
      <p className="search-filters__title">Facilities</p>
      <FormControlLabel
        control={
          <Checkbox
            sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
            checked={isWifiPresent}
            onChange={() => {
              dispatch(setIsWifiPresent(!isWifiPresent));
              props.refreshHotels();
            }}
          />
        }
        label="Wi-Fi"
        labelPlacement="start"
        className="search-filters__checkbox-input"
      />
      <FormControlLabel
        control={
          <Checkbox
            sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
            checked={isKitchenPresent}
            onChange={() => {
              dispatch(setIsKitchenPresent(!isKitchenPresent));
              props.refreshHotels();
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
              dispatch(setIsWashingMachinePresent(!isWashingMachinePresent));
              props.refreshHotels();
            }}
          />
        }
        label="Washing machine"
        labelPlacement="start"
        className="search-filters__checkbox-input"
      />
    </Paper>
  );
}

export default SearchFilters;

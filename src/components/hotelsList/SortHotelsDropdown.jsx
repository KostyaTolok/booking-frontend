import { KeyboardArrowDownRounded } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import AppPopper from "components/common/AppPopper";
import { HOTEL_SORTING_TYPES } from "constants/enums";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortHotelsByPrice, setSortHotelsByRating } from "redux/actions/hotelsListActions";
import "./SortHotelsDropdown.scss";

function SortHotelsDropdown(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const sortHotelsByRating = useSelector((store) => store.hotelsList.sortHotelsByRating);
  const sortHotelsByPrice = useSelector((store) => store.hotelsList.sortHotelsByPrice);
  const isDescendingOrder = useSelector((store) => store.hotelsList.isDescendingOrder);
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  }

  return (
    <>
      <div className="sort-dropdown-wrapper">
        Sort by:
        <div className="sort-dropdown" onClick={(event) => handleClick(event)}>
          {sortHotelsByRating & isDescendingOrder
            ? HOTEL_SORTING_TYPES.RATING_DESCENDING
            : sortHotelsByRating & !isDescendingOrder
            ? HOTEL_SORTING_TYPES.RATING_ASCENDING
            : sortHotelsByPrice & isDescendingOrder
            ? HOTEL_SORTING_TYPES.PRICE_DESCENDING
            : sortHotelsByPrice & !isDescendingOrder
            ? HOTEL_SORTING_TYPES.PRICE_ASCENDING
            : ""}
          <KeyboardArrowDownRounded sx={{ fontSize: 30 }} />
        </div>
      </div>
      <AppPopper open={open} setOpen={setOpen} anchorEl={anchorEl}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(setSortHotelsByRating({ isDescendingOrder: true }));
                setOpen(false);
                props.refreshHotels();
              }}
            >
              <ListItemText primary={HOTEL_SORTING_TYPES.RATING_DESCENDING} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(setSortHotelsByRating({ isDescendingOrder: false }));
                setOpen(false);
                props.refreshHotels();
              }}
            >
              <ListItemText primary={HOTEL_SORTING_TYPES.RATING_ASCENDING} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(setSortHotelsByPrice({ isDescendingOrder: false }));
                setOpen(false);
                props.refreshHotels();
              }}
            >
              <ListItemText primary={HOTEL_SORTING_TYPES.PRICE_ASCENDING} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(setSortHotelsByPrice({ isDescendingOrder: true }));
                setOpen(false);
                props.refreshHotels();
              }}
            >
              <ListItemText primary={HOTEL_SORTING_TYPES.PRICE_DESCENDING} />
            </ListItemButton>
          </ListItem>
        </List>
      </AppPopper>
    </>
  );
}

export default SortHotelsDropdown;

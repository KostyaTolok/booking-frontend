import { KeyboardArrowDownRounded } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import AppPopper from "components/common/AppPopper";
import { ROOM_SORTING_TYPES } from "constants/enums";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortRoomsByPrice } from "redux/actions/roomsActions";

function SortRoomsDropdown(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const sortRoomsByPrice = useSelector((store) => store.roomsList.sortRoomsByPrice);
  const isDescendingOrder = useSelector((store) => store.roomsList.isDescendingOrder);
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
          {sortRoomsByPrice & isDescendingOrder
            ? ROOM_SORTING_TYPES.PRICE_DESCENDING
            : sortRoomsByPrice & !isDescendingOrder
            ? ROOM_SORTING_TYPES.PRICE_ASCENDING
            : ""}
          <KeyboardArrowDownRounded sx={{ fontSize: 30 }} />
        </div>
      </div>
      <AppPopper open={open} setOpen={setOpen} anchorEl={anchorEl}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(setSortRoomsByPrice({ isDescendingOrder: true }));
                setOpen(false);
                props.refreshRooms();
              }}
            >
              <ListItemText primary={ROOM_SORTING_TYPES.PRICE_DESCENDING} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(setSortRoomsByPrice({ isDescendingOrder: false }));
                setOpen(false);
                props.refreshRooms();
              }}
            >
              <ListItemText primary={ROOM_SORTING_TYPES.PRICE_ASCENDING} />
            </ListItemButton>
          </ListItem>
        </List>
      </AppPopper>
    </>
  );
}

export default SortRoomsDropdown;

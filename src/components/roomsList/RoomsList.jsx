import { forwardRef } from "react";
import RoomsListItem from "./RoomsListItem";
import "./RoomsList.scss";

const RoomsList = forwardRef(function (props, ref) {
  return (
    <div ref={ref} className="rooms-list">
      {props.rooms.length !== 0 ? (
        props.rooms.map((room) => <RoomsListItem key={room.id} {...room} />)
      ) : (
        <h2>No rooms were found for required parameters</h2>
      )}
    </div>
  );
});

RoomsList.displayName = "RoomsList";

export default RoomsList;

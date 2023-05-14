import HotelsListItem from "./HotelsListItem";
import "./HotelsList.scss";

function HotelsList(props) {
  return (
    <div className="hotel-list">
      {props.hotels.length !== 0 ? (
        props.hotels.map((hotel) => <HotelsListItem key={hotel.id} {...hotel} />)
      ) : (
        <h2>No hotels were found for required parameters</h2>
      )}
    </div>
  );
}

export default HotelsList;

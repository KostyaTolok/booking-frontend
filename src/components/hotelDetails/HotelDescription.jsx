import "./HotelDescription.scss";

function HotelDescription(props) {
  return (
    <div className="hotel-description">
      <p className="hotel-description__title">Description</p>
      <p className="hotel-description__text">{props.text}</p>
    </div>
  );
}

export default HotelDescription;

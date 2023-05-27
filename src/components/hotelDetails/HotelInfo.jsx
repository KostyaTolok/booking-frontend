import Badge from "components/common/Badge";
import "./HotelInfo.scss";
import Carousel from "react-material-ui-carousel";

function HotelInfo(props) {
  return (
    <div className="hotel-info">
      <div className="hotel-info__header">
        <h2>{props.name}</h2>
        <Badge>{props.rating}</Badge>
      </div>
      <p className="hotel-info__address">{props.address}</p>
      <Carousel navButtonsAlwaysVisible>
        {props.images.map((image, i) => (
          <img className="hotel-info__image" key={i} src={image} />
        ))}
      </Carousel>
    </div>
  );
}

export default HotelInfo;

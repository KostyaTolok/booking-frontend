import Carousel from "react-material-ui-carousel";
import "./RoomInfo.scss";
import { forwardRef } from "react";

const RoomInfo = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="room-info">
      <div className="room-info__header">
        <h2>{props.name}</h2>
        <p className="room-info__price">{props.price} USD</p>
      </div>
      <Carousel navButtonsAlwaysVisible>
        {props.images.map((image, i) => (
          <img className="room-info__image" key={i} src={image} />
        ))}
      </Carousel>
    </div>
  );
});

RoomInfo.displayName = "RoomInfo";

export default RoomInfo;

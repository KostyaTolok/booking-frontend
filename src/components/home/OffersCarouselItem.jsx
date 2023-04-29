import { CAROUSEL_BACKGROUND_GRADIENT } from "constants/colors";
import "./OffersCarouselItem.scss";
import { Link } from "react-router-dom";

function OffersCarouselItem(props) {
  return (
    <Link to={props.url}>
      <div
        className="offers-carousel-item"
        style={{
          backgroundImage: `${CAROUSEL_BACKGROUND_GRADIENT}, url(${props.item.image})`,
        }}
      >
        <h1 className="offers-carousel-item__title">{props.item.name}</h1>
        <p className="offers-carousel-item__description">{props.item.description}</p>
      </div>
    </Link>
  );
}

export default OffersCarouselItem;

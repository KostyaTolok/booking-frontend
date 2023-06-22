import { CAROUSEL_BACKGROUND_GRADIENT } from "constants/colors";
import "./OffersCarouselItem.scss";
import { Link, useNavigate } from "react-router-dom";
import { setDateRange, setDestination } from "redux/actions/hotelsListActions";
import { useDispatch } from "react-redux";

function OffersCarouselItem(props) {
  const item = props.item;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onItemClick(event) {
    event.preventDefault();
    dispatch(setDestination({ destinationId: item.destinationId, destination: item.destination }));
    let startDate = new Date();
    let endDate = new Date();
    endDate.setDate(startDate.getDate() + 7);
    dispatch(setDateRange(startDate.toDateString(), endDate.toDateString()));
    navigate(item.url);
  }

  return (
    <Link to={item.url} onClick={(event) => onItemClick(event)}>
      <div
        className="offers-carousel-item"
        style={{
          backgroundImage: `${CAROUSEL_BACKGROUND_GRADIENT}, url(${item.image})`,
        }}
        onClick={onItemClick}
      >
        <h1 className="offers-carousel-item__title">{item.name}</h1>
        <p className="offers-carousel-item__description">{item.description}</p>
      </div>
    </Link>
  );
}

export default OffersCarouselItem;

import Carousel from "react-material-ui-carousel";
import OffersCarouselItem from "./OffersCarouselItem";
import minskOffer from "images/offer_1.jpg";
import brestOffer from "images/offer_2.jpg";
import { HOTELS_LIST_LINK } from "constants/links";

function OffersCarousel() {
  let offers = [
    {
      name: "Explore the capital of Belarus",
      description: "Search deals on hotels, homes, and much more in Minsk",
      url: HOTELS_LIST_LINK,
      image: minskOffer,
      destination: "Minsk",
      destinationId: 1,
    },
    {
      name: "Explore one of the oldest cities in Belarus",
      description: "Find a place to stay in Brest",
      url: HOTELS_LIST_LINK,
      image: brestOffer,
      destination: "Brest",
      destinationId: 2,
    },
  ];

  return (
    <Carousel>
      {offers.map((item, i) => (
        <OffersCarouselItem key={i} item={item} />
      ))}
    </Carousel>
  );
}

export default OffersCarousel;

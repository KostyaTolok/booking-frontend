import Carousel from "react-material-ui-carousel";
import OffersCarouselItem from "./OffersCarouselItem";
import minskOffer from "images/offer_1.jpg";
import brestOffer from "images/offer_2.jpg";

function OffersCarousel() {
  let offers = [
    {
      name: "Explore the capital of Belarus",
      description: "Search deals on hotels, homes, and much more in Minsk",
      url: "/",
      image: minskOffer,
    },
    {
      name: "Explore one of the oldest cities in Belarus",
      description: "Find a place to stay in Brest",
      url: "/",
      image: brestOffer,
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

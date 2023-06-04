import { Divider, Grid } from "@mui/material";
import Button from "components/common/Button";
import Description from "components/common/Description";
import HotelFacilities from "components/hotelDetails/HotelFacilities";
import HotelInfo from "components/hotelDetails/HotelInfo";
import HotelLocation from "components/hotelDetails/HotelLocation";
import RoomSearchFilters from "components/roomsList/RoomSearchFilters";
import RoomsList from "components/roomsList/RoomsList";
import SortRoomsDropdown from "components/roomsList/SortRoomsDropdown";
import AsideSearchForm from "components/search/AsideSearchForm";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AlertsService from "services/AlertsService";
import { LocalStorageService } from "services/LocalStorageService";
import { SearchApiService } from "services/SearchApiService";

function HotelDetailsPage() {
  const [needRefreshRooms, setNeedRefreshRooms] = useState(true);
  const [hotelLoaded, setHotelLoaded] = useState(false);
  const params = useParams();
  const hotelId = params.id;
  const [hotel, setHotel] = useState({
    name: "",
    description: "",
    address: "",
    rating: 0,
    cityName: "",
    hasWifi: false,
    hasParking: false,
    latitude: 0,
    longitude: 0,
  });
  const [hotelImages, setHotelImages] = useState([]);
  const roomsList = useSelector((store) => store.roomsList);
  const [rooms, setRooms] = useState([]);
  const roomsListRef = useRef(null);

  useEffect(() => {
    if (!hotelLoaded) {
      SearchApiService.getHotelDetails(hotelId)
        .then((response) => {
          setHotel({
            name: response.data.name,
            description: response.data.description,
            address: response.data.address,
            rating: response.data.rating,
            cityName: response.data.city_name,
            hasWifi: response.data.has_wifi,
            hasParking: response.data.has_parking,
            latitude: parseFloat(response.data.latitude),
            longitude: parseFloat(response.data.longitude),
          });

          let images = [];
          response.data.images.forEach((element) => {
            images.push(element.image_key);
          });
          setHotelImages(images);
          setHotelLoaded(true);
          LocalStorageService.addRecentView({
            id: response.data.id,
            imageUrl: images.at(0),
            name: response.data.name,
            rating: response.data.rating,
            description: response.data.description,
            destination: response.data.destination,
          });
        })
        .catch((error) => {
          setNeedRefreshRooms(false);
          AlertsService.showAlert(error);
        });
    }

    if (needRefreshRooms) {
      SearchApiService.getHotelRooms({
        hotelId: hotelId,
        lowRoomPrice: roomsList.lowPrice,
        highRoomPrice: roomsList.highPrice,
        bedNumber: roomsList.numberOfBeds,
        roomsNumber: roomsList.numberOfRooms,
        hasKitchen: roomsList.hasKitchen,
        hasWashingMachine: roomsList.hasWashingMachine,
        sortRoomsByPrice: roomsList.sortRoomsByPrice,
        isDescendingOrder: roomsList.isDescendingOrder,
      })
        .then((response) => {
          setNeedRefreshRooms(false);
          setRooms(response.data);
        })
        .catch((error) => {
          setNeedRefreshRooms(false);
          AlertsService.showAlert(error);
        });
    }
  }, [needRefreshRooms]);

  function refreshRooms() {
    setNeedRefreshRooms(true);
  }

  function hadleSelectRoomClick() {
    roomsListRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Grid container spacing={3.75}>
      <Grid item xs={3}>
        <AsideSearchForm />
        <HotelLocation hotelLoaded={hotelLoaded} latitude={hotel.latitude} longitude={hotel.longitude} />
      </Grid>
      <Grid item xs={9}>
        <HotelInfo name={hotel.name} address={hotel.address} rating={hotel.rating} images={hotelImages} />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={9}>
        <Description text={hotel.description} />
      </Grid>
      <Grid item xs={3}>
        <HotelFacilities hasWifi={hotel.hasWifi} hasParking={hotel.hasParking} />
        <Divider sx={{ marginY: 3.75 }} />
        <Button
          className="button_large button_orange button_rounded button_full-width"
          type="button"
          onClick={hadleSelectRoomClick}
        >
          Select Room
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={3}>
        <RoomSearchFilters refreshRooms={refreshRooms} />
      </Grid>
      <Grid item xs={9}>
        <SortRoomsDropdown refreshRooms={refreshRooms} />
        <RoomsList ref={roomsListRef} rooms={rooms} />
      </Grid>
    </Grid>
  );
}

export default HotelDetailsPage;

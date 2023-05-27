import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AlertsService from "services/AlertsService";
import { SearchApiService } from "services/SearchApiService";
import { Grid } from "@mui/material";
import AsideSearchForm from "components/search/AsideSearchForm";
import HotelsList from "components/hotelsList/HotelsList";
import HotelSearchFilters from "components/hotelsList/HotelSearchFilters";
import SortHotelsDropdown from "components/hotelsList/SortHotelsDropdown";

function HotelsListPage() {
  const [hotels, setHotels] = useState([]);
  const [needHotelsRefresh, setNeedHotelsRefresh] = useState(true);
  const hotelsList = useSelector((store) => store.hotelsList);

  function refreshHotels() {
    setNeedHotelsRefresh(true);
  }

  useEffect(() => {
    if (needHotelsRefresh) {
      SearchApiService.getHotels({
        cityId: hotelsList.destinationId,
        numberOfGuests: hotelsList.numberOfGuests,
        numberOfRooms: hotelsList.numberOfRooms,
        sortHotelsByRating: hotelsList.sortHotelsByRating,
        sortHotelsByPrice: hotelsList.sortHotelsByPrice,
        isDescendingOrder: hotelsList.isDescendingOrder,
        startDate: hotelsList.startDate,
        endDate: hotelsList.endDate,
        isWifiPresent: hotelsList.isWifiPresent,
        isWashingMachinePresent: hotelsList.isWashingMachinePresent,
        isKitchenPresent: hotelsList.isKitchenPresent,
        lowHotelPrice: hotelsList.lowPrice,
        highHotelPrice: hotelsList.highPrice,
      })
        .then((response) => {
          setHotels(response.data);
          setNeedHotelsRefresh(false);
        })
        .catch((error) => {
          AlertsService.showAlert(error);
          setNeedHotelsRefresh(false);
        });
    }
  }, [needHotelsRefresh]);

  return (
    <Grid container spacing={3.75}>
      <Grid item xs={3}>
        <AsideSearchForm refreshHotels={refreshHotels} />
        <HotelSearchFilters refreshHotels={refreshHotels} />
      </Grid>
      <Grid item xs={9}>
        <SortHotelsDropdown refreshHotels={refreshHotels} />
        <HotelsList hotels={hotels} />
      </Grid>
    </Grid>
  );
}

export default HotelsListPage;

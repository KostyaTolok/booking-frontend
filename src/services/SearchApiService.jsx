import { SEARCH_API_BASE_URL } from "constants/api";
import { AxiosService } from "services/AxiosService";
import { DateFormatterService } from "./DateFormatterService";

export class SearchApiService {
  static searchApiPublicFetcher = AxiosService.getPublicFetcher(SEARCH_API_BASE_URL);
  static searchApiPrivateFetcher = AxiosService.getPrivateFetcher(SEARCH_API_BASE_URL, false);

  static getCities() {
    return this.searchApiPublicFetcher.get("cities/");
  }

  static getHotels({
    cityId,
    numberOfGuests,
    numberOfRooms,
    sortHotelsByRating,
    sortHotelsByPrice,
    isDescendingOrder,
    startDate,
    endDate,
    isWifiPresent,
    isWashingMachinePresent,
    isKitchenPresent,
    lowHotelPrice,
    highHotelPrice,
  }) {
    function getSortingOrder() {
      let field = null;
      if (sortHotelsByPrice) {
        field = "min_price";
      } else if (sortHotelsByRating) {
        field = "rating";
      }
      return isDescendingOrder ? "-" + field : field;
    }
    let queryParams = {
      city: cityId,
      beds_number: numberOfGuests,
      rooms_number: numberOfRooms,
      order: getSortingOrder(),
      date_after: startDate ? DateFormatterService.toBackendDateFormat(new Date(startDate)) : "",
      date_before: endDate ? DateFormatterService.toBackendDateFormat(new Date(endDate)) : "",
      has_wifi: isWifiPresent ? isWifiPresent : "",
      has_washing_machine: isWashingMachinePresent ? isWashingMachinePresent : "",
      has_kitchen: isKitchenPresent ? isKitchenPresent : "",
      price_min: lowHotelPrice,
      price_max: highHotelPrice,
    };
    let response = this.searchApiPublicFetcher.get("hotels/", { params: queryParams });
    return response;
  }

  static getHotelDetails = (hotelId) => {
    let response = this.searchApiPublicFetcher.get(`hotels/${hotelId}/`);
    return response;
  };

  static getHotelRooms = ({
    hotelId,
    lowRoomPrice,
    highRoomPrice,
    bedNumber,
    roomsNumber,
    hasKitchen,
    hasWashingMachine,
    sortRoomsByPrice,
    isDescendingOrder,
  }) => {
    const getOrder = () => {
      let field = null;
      if (sortRoomsByPrice) {
        field = "price";
      }
      return isDescendingOrder ? "-" + field : field;
    };

    let queryParams = {
      hotel: hotelId,
      price_min: lowRoomPrice,
      price_max: highRoomPrice,
      beds_number: bedNumber,
      rooms_number: roomsNumber,
      has_kitchen: hasKitchen ? hasKitchen : "",
      has_washing_machine: hasWashingMachine ? hasWashingMachine : "",
      order: getOrder(),
    };
    let response = this.searchApiPublicFetcher.get(`rooms/`, { params: queryParams });
    return response;
  };
}

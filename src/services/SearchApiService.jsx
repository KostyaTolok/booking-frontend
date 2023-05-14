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
}

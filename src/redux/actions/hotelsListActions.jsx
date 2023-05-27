import {
  SET_DATE_RANGE,
  SET_DESTINATION,
  SET_IS_KITCHEN_PRESENT,
  SET_IS_WASHING_MACHINE_PRESENT,
  SET_IS_WIFI_PRESENT,
  SET_NUMBER_OF_GUESTS,
  SET_NUMBER_OF_ROOMS,
  SET_PRICE_RANGE,
  SET_SORT_HOTELS,
} from "redux/constants";

export function setDestination({ destinationId, destination }) {
  return {
    type: SET_DESTINATION,
    destinationId: destinationId,
    destination: destination,
  };
}

export function setDateRange(startDate, endDate) {
  return {
    type: SET_DATE_RANGE,
    startDate: startDate,
    endDate: endDate,
  };
}

export function setHotelNumberOfGuests(numberOfGuests) {
  return {
    type: SET_NUMBER_OF_GUESTS,
    numberOfGuests: numberOfGuests,
  };
}

export function setHotelNumberOfRooms(numberOfRooms) {
  return {
    type: SET_NUMBER_OF_ROOMS,
    numberOfRooms: numberOfRooms,
  };
}

export function setHotelPriceRange({ lowPrice, highPrice }) {
  return {
    type: SET_PRICE_RANGE,
    lowPrice: lowPrice,
    highPrice: highPrice,
  };
}

export function setIsHotelWifiPresent(isWifiPresent) {
  return {
    type: SET_IS_WIFI_PRESENT,
    isWifiPresent: isWifiPresent,
  };
}

export function setIsHotelKitchenPresent(isKitchenPresent) {
  return {
    type: SET_IS_KITCHEN_PRESENT,
    isKitchenPresent: isKitchenPresent,
  };
}

export function setIsHotelWashingMachinePresent(isWashingMachinePresent) {
  return {
    type: SET_IS_WASHING_MACHINE_PRESENT,
    isWashingMachinePresent: isWashingMachinePresent,
  };
}

export const setSortHotelsByRating = ({ isDescendingOrder }) => {
  return {
    type: SET_SORT_HOTELS,
    sortHotelsByRating: true,
    sortHotelsByPrice: false,
    isDescendingOrder: isDescendingOrder,
  };
};

export const setSortHotelsByPrice = ({ isDescendingOrder }) => {
  return {
    type: SET_SORT_HOTELS,
    sortHotelsByRating: false,
    sortHotelsByPrice: true,
    isDescendingOrder: isDescendingOrder,
  };
};

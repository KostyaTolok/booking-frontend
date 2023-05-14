import { MAX_ROOM_PRICE, MIN_ROOM_PRICE } from "constants/values";
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

const INITIAL_STATE = {
  destination: "",
  destinationId: 0,
  startDate: "",
  endDate: "",
  numberOfGuests: 0,
  numberOfRooms: 0,
  lowPrice: MIN_ROOM_PRICE,
  highPrice: MAX_ROOM_PRICE,
  isWifiPresent: false,
  isKitchenPresent: false,
  isWashingMachinePresent: false,
  sortHotelsByRating: true,
  sortHotelsByPrice: false,
  isDescendingOrder: true,
};

function hotelsListReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_DESTINATION:
      return {
        ...state,
        destination: action.destination,
        destinationId: action.destinationId,
      };
    case SET_DATE_RANGE:
      return {
        ...state,
        startDate: action.startDate,
        endDate: action.endDate,
      };
    case SET_NUMBER_OF_GUESTS:
      return {
        ...state,
        numberOfGuests: action.numberOfGuests,
      };
    case SET_NUMBER_OF_ROOMS:
      return {
        ...state,
        numberOfRooms: action.numberOfRooms,
      };
    case SET_PRICE_RANGE:
      return {
        ...state,
        lowPrice: action.lowPrice,
        highPrice: action.highPrice,
      };
    case SET_IS_WIFI_PRESENT:
      return {
        ...state,
        isWifiPresent: action.isWifiPresent,
      };
    case SET_IS_KITCHEN_PRESENT:
      return {
        ...state,
        isKitchenPresent: action.isKitchenPresent,
      };
    case SET_IS_WASHING_MACHINE_PRESENT:
      return {
        ...state,
        isWashingMachinePresent: action.isWashingMachinePresent,
      };
    case SET_SORT_HOTELS:
      return {
        ...state,
        sortHotelsByRating: action.sortHotelsByRating,
        sortHotelsByPrice: action.sortHotelsByPrice,
        sortHotelsByDestination: action.sortHotelsByDestination,
        isDescendingOrder: action.isDescendingOrder,
      };
    default:
      return state;
  }
}

export default hotelsListReducer;

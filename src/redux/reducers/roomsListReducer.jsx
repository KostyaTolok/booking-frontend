import { MAX_ROOM_PRICE, MIN_ROOM_PRICE } from "constants/values";
import {
  SET_ROOMS_PRICE_RANGE,
  SET_IS_ROOM_KITCHEN_PRESENT,
  SET_IS_ROOM_WASHING_MACHINE_PRESENT,
  SET_ROOM_NUMBER_OF_BEDS,
  SET_ROOM_NUMBER_OF_ROOMS,
  SET_SORT_ROOMS,
} from "redux/constants";

const INITIAL_STATE = {
  numberOfBeds: 0,
  numberOfRooms: 0,
  lowPrice: MIN_ROOM_PRICE,
  highPrice: MAX_ROOM_PRICE,
  isWifiPresent: false,
  isKitchenPresent: false,
  isWashingMachinePresent: false,
  sortRoomsByPrice: true,
  isDescendingOrder: true,
};

function roomsListReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_ROOM_NUMBER_OF_BEDS:
      return {
        ...state,
        numberOfBeds: action.numberOfBeds,
      };
    case SET_ROOM_NUMBER_OF_ROOMS:
      return {
        ...state,
        numberOfRooms: action.numberOfRooms,
      };
    case SET_ROOMS_PRICE_RANGE:
      return {
        ...state,
        lowPrice: action.lowPrice,
        highPrice: action.highPrice,
      };
    case SET_IS_ROOM_KITCHEN_PRESENT:
      return {
        ...state,
        isKitchenPresent: action.isKitchenPresent,
      };
    case SET_IS_ROOM_WASHING_MACHINE_PRESENT:
      return {
        ...state,
        isWashingMachinePresent: action.isWashingMachinePresent,
      };
    case SET_SORT_ROOMS:
      return {
        ...state,
        isDescendingOrder: action.isDescendingOrder,
      };
    default:
      return state;
  }
}

export default roomsListReducer;

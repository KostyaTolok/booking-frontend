import {
  SET_IS_ROOM_KITCHEN_PRESENT,
  SET_IS_ROOM_WASHING_MACHINE_PRESENT,
  SET_ROOMS_PRICE_RANGE,
  SET_ROOM_NUMBER_OF_BEDS,
  SET_ROOM_NUMBER_OF_ROOMS,
  SET_SORT_ROOMS,
} from "redux/constants";

export function setRoomsPriceRange({ lowPrice, highPrice }) {
  return {
    type: SET_ROOMS_PRICE_RANGE,
    lowPrice: lowPrice,
    highPrice: highPrice,
  };
}

export function setIsRoomKitchenPresent(isKitchenPresent) {
  return {
    type: SET_IS_ROOM_KITCHEN_PRESENT,
    isKitchenPresent: isKitchenPresent,
  };
}

export function setIsRoomWashingMachinePresent(isWashingMachinePresent) {
  return {
    type: SET_IS_ROOM_WASHING_MACHINE_PRESENT,
    isWashingMachinePresent: isWashingMachinePresent,
  };
}

export const setSortRoomsByPrice = ({ isDescendingOrder }) => {
  return {
    type: SET_SORT_ROOMS,
    isDescendingOrder: isDescendingOrder,
  };
};

export function setRoomNumberOfBeds(numberOfBeds) {
  return {
    type: SET_ROOM_NUMBER_OF_BEDS,
    numberOfBeds: numberOfBeds,
  };
}

export function setRoomNumberOfRooms(numberOfRooms) {
  return {
    type: SET_ROOM_NUMBER_OF_ROOMS,
    numberOfRooms: numberOfRooms,
  };
}

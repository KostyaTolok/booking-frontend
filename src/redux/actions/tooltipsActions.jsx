import { SET_DATES_TOOLTIP_OPEN, SET_DESTINATION_TOOLTIP_OPEN } from "redux/constants";

export function setDestinationTooltipOpen(open) {
  return {
    type: SET_DESTINATION_TOOLTIP_OPEN,
    destinationTooltipOpen: open,
  };
}

export function setDatesTooltipOpen(open) {
  return {
    type: SET_DATES_TOOLTIP_OPEN,
    datesTooltipOpen: open,
  };
}

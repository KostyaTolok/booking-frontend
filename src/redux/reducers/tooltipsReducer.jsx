import { SET_DATES_TOOLTIP_OPEN, SET_DESTINATION_TOOLTIP_OPEN } from "redux/constants";

const INITIAL_STATE = {
  destinationTooltipOpen: false,
  datesTooltipOpen: false,
};

function tooltipsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_DESTINATION_TOOLTIP_OPEN:
      return {
        ...state,
        destinationTooltipOpen: action.destinationTooltipOpen,
      };
    case SET_DATES_TOOLTIP_OPEN:
      return {
        ...state,
        datesTooltipOpen: action.datesTooltipOpen,
      };
    default:
      return state;
  }
}

export default tooltipsReducer;

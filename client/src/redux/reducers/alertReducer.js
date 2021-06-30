import { ALERT_TYPES } from "../actions/alertAction";

const initialState = {};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALERT_TYPES.ALERT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default alertReducer;

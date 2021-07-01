export const ALERT_TYPES = {
  ALERT: "ALERT",
  RESET: "RESET",
};

export const alertReset = () => async (dispatch) => {
  dispatch({ type: ALERT_TYPES.RESET, payload: {} });
};

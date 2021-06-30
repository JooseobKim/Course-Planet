export const ALERT_TYPES = {
  ALERT: "ALERT",
};

export const alertReset = () => async (dispatch) => {
  dispatch({ type: ALERT_TYPES.ALERT, payload: {} });
};

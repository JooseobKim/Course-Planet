import { combineReducers } from "redux";
import alert from "../reducers/alertReducer";
import course from "../reducers/courseReducer";

export default combineReducers({
  alert,
  course,
});

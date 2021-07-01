import { combineReducers } from "redux";
import alert from "../reducers/alertReducer";
import course from "../reducers/courseReducer";
import auth from "../reducers/authReducer";

export default combineReducers({
  auth,
  alert,
  course,
});

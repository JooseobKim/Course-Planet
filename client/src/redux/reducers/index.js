import { combineReducers } from "redux";
import alert from "../reducers/alertReducer";
import course from "../reducers/courseReducer";
import auth from "../reducers/authReducer";
import review from "../reducers/reviewReducer";

export default combineReducers({
  auth,
  alert,
  course,
  review,
});

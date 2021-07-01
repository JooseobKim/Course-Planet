import { COURSE_TYPES } from "../actions/courseAction";

const initialState = {
  inflearn_courses: [],
  fastcampus_courses: [],
  get_courses: [],
  get_course: [],
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case COURSE_TYPES.SCRAPING_INFLERN:
      return {
        ...state,
        inflearn_courses: [...state.inflearn_courses, ...action.payload],
      };
    case COURSE_TYPES.SCRAPING_FASTCAMPUS:
      return {
        ...state,
        fastcampus_courses: [...state.fastcampus_courses, ...action.payload],
      };
    case COURSE_TYPES.CLEAR_SCRAPING_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case COURSE_TYPES.GET_COURSES:
      return {
        ...state,
        get_courses: [...action.payload],
      };
    case COURSE_TYPES.GET_COURSE:
      return {
        ...state,
        get_course: [...state.get_course, action.payload],
      };
    default:
      return state;
  }
};

export default courseReducer;

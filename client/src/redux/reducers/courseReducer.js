import { COURSE_TYPES } from "../actions/courseAction";

const initialState = {
  inflearn_courses: [],
  fastcampus_courses: [],
  search_keyword: {},
  page: 1,
  get_course: [],
  most_review_courses: [],
  recent_review_courses: [],
  get_recent_add_courses: [],
  get_courses_per_page: [],
};

const editData = (prev_data, id, update_data) => {
  const newData = prev_data.map((item) =>
    item._id === id ? update_data : item
  );
  return newData;
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
    case COURSE_TYPES.SEARCH_KEYWORD:
      return {
        ...state,
        search_keyword: action.payload,
      };
    case COURSE_TYPES.PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case COURSE_TYPES.GET_COURSE:
      return {
        ...state,
        get_course: [...state.get_course, action.payload],
      };
    case COURSE_TYPES.UPDATE_COURSE:
      return {
        ...state,
        get_course: editData(
          state.get_course,
          action.payload._id,
          action.payload
        ),
      };
    case COURSE_TYPES.GET_MOST_REVIEW:
      return {
        ...state,
        most_review_courses: [
          ...state.most_review_courses,
          ...action.payload,
        ].splice(0, 20),
      };
    case COURSE_TYPES.GET_RECENT_REVIEW:
      return {
        ...state,
        recent_review_courses: [
          ...state.recent_review_courses,
          ...action.payload,
        ].splice(0, 20),
      };
    case COURSE_TYPES.GET_RECENT_ADD_COURSES:
      return {
        ...state,
        get_recent_add_courses: [
          ...state.get_recent_add_courses,
          ...action.payload,
        ].splice(0, 20),
      };
    case COURSE_TYPES.GET_COURSES_PER_PAGE:
      return {
        ...state,
        get_courses_per_page: [...action.payload.courses],
        total_page: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default courseReducer;

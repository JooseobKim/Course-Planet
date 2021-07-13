import { REVIEW_TYPES } from "../actions/reviewAction";

const initialState = {
  detail_course_reviews: [],
  user_reviews: [],
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case REVIEW_TYPES.GET_DETAIL_COURSE_REVIEWS:
      return {
        ...state,
        detail_course_reviews: [...action.payload],
      };
    case REVIEW_TYPES.CREATE_REVIEWS:
      return {
        ...state,
        detail_course_reviews: [action.payload, ...state.detail_course_reviews],
      };
    case REVIEW_TYPES.UPDATE_REVIEWS:
      return {
        ...state,
        detail_course_reviews: editData(
          state.detail_course_reviews,
          action.payload.reviewId,
          { merit: action.payload.merit, demerit: action.payload.demerit }
        ),
      };
    case REVIEW_TYPES.DELETE_REVIEWS:
      return {
        ...state,
        detail_course_reviews: deleteData(
          state.detail_course_reviews,
          action.payload
        ),
      };
    case REVIEW_TYPES.LIKE_REVIEW:
      return {
        ...state,
        detail_course_reviews: updateLikes(
          state.detail_course_reviews,
          action.payload.reviewId,
          { likes: action.payload.authId }
        ),
      };
    case REVIEW_TYPES.UNLIKE_REVIEW:
      return {
        ...state,
        detail_course_reviews: deleteLikes(
          state.detail_course_reviews,
          action.payload.reviewId,
          action.payload.reviewArr,
          action.payload.authId
        ),
      };
    case REVIEW_TYPES.GET_USER_REVIEWS:
      return {
        ...state,
        user_reviews: [...state.user_reviews, ...action.payload],
      };
    default:
      return state;
  }
};

// 리뷰 업데이트 함수
const editData = (prev_data, id, update_data) => {
  const newData = prev_data.map((item) =>
    item._id === id
      ? {
          ...item,
          merit: update_data.merit || item.merit,
          demerit: update_data.demerit || item.demerit,
        }
      : item
  );
  return newData;
};

// 리뷰 좋아요 함수
const updateLikes = (prev_data, id, update_data) => {
  const newData = prev_data.map((item) =>
    item._id === id
      ? {
          ...item,
          likes: [...item.likes, update_data.likes],
        }
      : item
  );
  return newData;
};

// 리뷰 좋아요 취소 함수
const deleteLikes = (prev_data, reviewId, reviewLikesArr, authId) => {
  const newLikesArr = reviewLikesArr.filter(
    (like) => (like._id || like) !== authId
  );
  const newData = prev_data.map((item) =>
    item._id === reviewId
      ? {
          ...item,
          likes: [...newLikesArr] || item.likes,
        }
      : item
  );
  return newData;
};

// 리뷰 삭제 함수
const deleteData = (data, id) => {
  const newData = data.filter((item) => item._id !== id);
  return newData;
};

export default reviewReducer;

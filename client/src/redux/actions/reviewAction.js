import axios from "axios";
import { ALERT_TYPES } from "./alertAction";
import { COURSE_TYPES } from "./courseAction";

export const createReview =
  ({
    difficulty,
    merit,
    demerit,
    rating,
    userId,
    courseId,
    detailCourse,
    auth,
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

      const res = await axios.post(
        "/review",
        {
          difficulty,
          merit,
          demerit,
          rating,
          userId,
          courseId,
        },
        { headers: { Authorization: auth.token } }
      );

      const newData = { ...res.data.newReview, owner: auth.user };
      const updateCourse = {
        ...detailCourse,
        review: [...detailCourse.review, newData],
      };

      dispatch({
        type: COURSE_TYPES.UPDATE_COURSE,
        payload: updateCourse,
      });

      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { loading: false, msg: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { err: err.message, loading: false },
      });
    }
  };

export const updateReview =
  ({ merit, demerit, detailCourse, auth, reviewId }) =>
  async (dispatch) => {
    const editReview = (prev_data, id, merit, demerit) => {
      const updateData = prev_data.map((item) =>
        item._id === id ? { ...item, merit, demerit } : item
      );

      return updateData;
    };

    try {
      const res = await axios.patch(
        "/review",
        { merit, demerit, userId: auth.user._id },
        { headers: { Authorization: auth.token } }
      );

      const updateReview = editReview(
        detailCourse.review,
        reviewId,
        merit,
        demerit
      );
      const newCourse = { ...detailCourse, review: updateReview };

      dispatch({ type: COURSE_TYPES.UPDATE_COURSE, payload: newCourse });

      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { msg: res.data.msg, loading: false },
      });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { msg: err.message, loading: false },
      });
    }
  };

export const deleteReview =
  ({ detailCourse, auth, reviewId }) =>
  async (dispatch) => {
    try {
      const res = await axios.delete("/review", {
        headers: { Authorization: auth.token },
      });

      const deleteData = detailCourse.review.filter(
        (item) => item._id !== reviewId
      );
      const newCourse = { ...detailCourse, review: deleteData };

      dispatch({ type: COURSE_TYPES.UPDATE_COURSE, payload: newCourse });

      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { msg: res.data.msg, loading: false },
      });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { msg: err.message },
      });
    }
  };

export const likeReview =
  ({ review, auth, detailCourse }) =>
  async (dispatch) => {
    const editReview = (prev_data, id, update_data) => {
      const updateData = prev_data.map((item) =>
        item._id === id ? update_data : item
      );

      return updateData;
    };

    try {
      dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

      const res = await axios.patch(`/review/${review._id}/like`, null, {
        headers: { Authorization: auth.token },
      });

      const addLike = { ...review, likes: [...review.likes, auth.user._id] };
      const newReviewArr = editReview(detailCourse.review, review._id, addLike);
      const updateCourse = { ...detailCourse, review: newReviewArr };

      dispatch({ type: COURSE_TYPES.UPDATE_COURSE, payload: updateCourse });

      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { loading: false, msg: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { msg: err.response.data.msg, loading: false },
      });
    }
  };

export const unlikeReview =
  ({ review, auth, detailCourse }) =>
  async (dispatch) => {
    const removeReviewLike = (prev_data, id) => {
      const removeLikeData = prev_data.filter((item) => item !== id);

      return removeLikeData;
    };

    const editReview = (prev_data, id, update_data) => {
      const updateData = prev_data.map((item) =>
        item._id === id ? update_data : item
      );

      return updateData;
    };

    try {
      dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

      const res = await axios.patch(`/review/${review._id}/unlike`, null, {
        headers: { Authorization: auth.token },
      });

      const removeLike = {
        ...review,
        likes: removeReviewLike(review.likes, auth.user._id),
      };
      const newReviewArr = editReview(
        detailCourse.review,
        review._id,
        removeLike
      );
      const updateCourse = { ...detailCourse, review: newReviewArr };

      dispatch({ type: COURSE_TYPES.UPDATE_COURSE, payload: updateCourse });

      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { loading: false, msg: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { msg: err.message, loading: false },
      });
    }
  };

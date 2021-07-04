import axios from "axios";
import { ALERT_TYPES } from "./alertAction";

export const COURSE_TYPES = {
  SCRAPING_INFLERN: "SCRAPING_INFLERN",
  SCRAPING_FASTCAMPUS: "SCRAPING_FASTCAMPUS",
  CLEAR_SCRAPING_DATA: "CLEAR_SCRAPING_DATA",
  GET_COURSES: "GET_COURSES",
  GET_COURSE: "GET_COURSE",
  UPDATE_COURSE: "UPDATE_COURSE",
};

export const scrapingInflearnCourses =
  ({ order, pageFrom, pageTo, prev_courses, auth }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { loading: true },
      });

      const res = await axios.post(
        "/courses/admin/inflearn",
        {
          order,
          pageFrom,
          pageTo,
        },
        {
          headers: { Authorization: auth.token },
        }
      );

      const filteringCourse = (prev_courses) => {
        if (prev_courses) {
          let filteringCourses = [];

          for (let i = 0; i < res.data.inflearnCourses.length; i++) {
            const filteringData = res.data.inflearnCourses[i];
            const findNotEqual = prev_courses.every(
              (prevCourse) => filteringData.title !== prevCourse.title
            );

            if (findNotEqual) filteringCourses.push({ ...filteringData });
          }

          return filteringCourses;
        }
      };

      const filteredCourses = filteringCourse(prev_courses);

      dispatch({
        type: COURSE_TYPES.SCRAPING_INFLERN,
        payload: filteredCourses,
      });

      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: {
          loading: false,
          msg: `${res.data.msg} 필터링 된 스크래핑 결과 총 ${filteredCourses.length}개`,
        },
      });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { loading: false, errMsg: err.message },
      });
    }
  };

export const scrapingFastcampusCourses =
  ({ category, prev_courses, auth }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { loading: true },
      });

      const res = await axios.post(
        "/courses/admin/fastcampus",
        {
          category,
        },
        {
          headers: { Authorization: auth.token },
        }
      );

      const filteringCourse = (prev_courses) => {
        if (prev_courses) {
          let filteringCourses = [];

          for (let i = 0; i < res.data.fastcampusCourses.length; i++) {
            const filteringData = res.data.fastcampusCourses[i];
            const findNotEqual = prev_courses.every(
              (prevCourse) => filteringData.title !== prevCourse.title
            );

            if (findNotEqual) filteringCourses.push({ ...filteringData });
          }

          return filteringCourses;
        }
      };

      const filteredCourses = filteringCourse(prev_courses);

      dispatch({
        type: COURSE_TYPES.SCRAPING_FASTCAMPUS,
        payload: filteredCourses,
      });

      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: {
          loading: false,
          msg: `${res.data.msg} 필터링 된 스크래핑 결과 총 ${filteredCourses.length}개`,
        },
      });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: {
          loading: false,
          errMsg: err.message,
        },
      });
    }
  };

export const scrapingDataSave =
  ({ data, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

      const res = await axios.post(
        "/courses/admin/save_data",
        { data },
        {
          headers: { Authorization: auth.token },
        }
      );

      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: {
          loading: false,
          msg: res.data.msg,
        },
      });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: {
          loading: false,
          errMsg: err.message,
        },
      });
    }
  };

export const clearScrapingData =
  ({ platform }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

      switch (platform) {
        case "inflearn":
          dispatch({
            type: COURSE_TYPES.CLEAR_SCRAPING_DATA,
            payload: { inflearn_courses: [] },
          });
          break;
        case "fastcampus":
          dispatch({
            type: COURSE_TYPES.CLEAR_SCRAPING_DATA,
            payload: { fastcampus_courses: [] },
          });
          break;
        default:
          break;
      }

      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { loading: false, msg: "스크래핑 데이터 초기화 완료" },
      });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { loading: false, msg: err.message },
      });
    }
  };

export const getCourses = () => async (dispatch) => {
  try {
    dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

    const res = await axios.get("/courses");

    dispatch({
      type: COURSE_TYPES.GET_COURSES,
      payload: res.data.courses,
    });

    dispatch({
      type: ALERT_TYPES.ALERT,
      payload: { loading: false, msg: res.data.msg },
    });
  } catch (err) {
    dispatch({
      type: ALERT_TYPES.ALERT,
      payload: { loading: false, msg: err.message },
    });
  }
};

export const getCourse =
  ({ courses, id }) =>
  async (dispatch) => {
    if (courses.every((course) => course._id !== id)) {
      try {
        dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

        const res = await axios.get(`/courses/${id}`);

        dispatch({
          type: COURSE_TYPES.GET_COURSE,
          payload: res.data.course,
        });

        dispatch({
          type: ALERT_TYPES.ALERT,
          payload: { loading: false, msg: res.data.msg },
        });
      } catch (err) {
        dispatch({
          type: ALERT_TYPES.ALERT,
          payload: { loading: false, msg: err.message },
        });
      }
    }
  };
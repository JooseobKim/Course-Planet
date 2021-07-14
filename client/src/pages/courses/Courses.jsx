import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Course from "../../components/Course";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useLocation } from "react-router";
import Pagination from "../../components/Pagination";
import axios from "axios";
import Skeleton from "../../components/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { ALERT_TYPES } from "../../redux/actions/alertAction";
import { COURSE_TYPES } from "../../redux/actions/courseAction";

const pageRegex = (page) => {
  const re = /[0-9]/g;
  return page.match(re);
};

const Courses = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    course: { search_courses },
  } = useSelector((state) => state);

  const [totalPage, setTotalPage] = useState(0);
  const [pageNum, setPageNum] = useState(
    parseInt(pageRegex(location.search)) || 1
  );
  const pages = new Array(totalPage).fill(null).map((v, i) => i);
  const [checkedState, setCheckedState] = useState({
    inflearn: true,
    fastcampus: true,
  });

  const [coursesPerPage, setCoursesPerPage] = useState([]);

  const handleOnChange = (e) => {
    const { name, checked } = e.target;

    setCheckedState({ ...checkedState, [name]: checked });
  };

  useEffect(() => {
    if (!(search_courses.length === 0)) {
      setTotalPage(Math.ceil(search_courses.length / 15));

      if (checkedState.inflearn && !checkedState.fastcampus) {
        const filteredCourses = search_courses.filter(
          (course) => course.platform !== "fastcampus"
        );
        setCoursesPerPage(filteredCourses);
      } else if (!checkedState.inflearn && checkedState.fastcampus) {
        const filteredCourses = search_courses.filter(
          (course) => course.platform !== "inflearn"
        );
        setCoursesPerPage(filteredCourses);
      } else {
        setCoursesPerPage(search_courses);
      }
    } else {
      const getCourses = async () => {
        dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

        const res = await axios.get(
          `/courses?page=${pageNum}&platform=${JSON.stringify(checkedState)}`
        );
        setCoursesPerPage(res.data.courses);
        setTotalPage(res.data.totalPage);

        dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: false } });
      };
      getCourses();
    }

    if (pageNum <= 0 || pageNum > totalPage) setPageNum(1);
  }, [checkedState, pageNum, totalPage, dispatch, search_courses]);

  return (
    <StyledCourses>
      <div className="wrapper">
        <div className="courses__navbar">
          <FormControlLabel
            control={
              <Checkbox
                name="inflearn"
                checked={checkedState.inflearn}
                onChange={handleOnChange}
              />
            }
            label="인프런"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="fastcampus"
                checked={checkedState.fastcampus}
                onChange={handleOnChange}
              />
            }
            label="패스트캠퍼스"
          />
          {!(search_courses.length === 0) && (
            <div className="courses__navbar__search-init">
              <button
                className="courses__navbar__search-init__btn"
                onClick={() =>
                  dispatch({
                    type: COURSE_TYPES.SEARCH_COURSES,
                    payload: [],
                  })
                }
              >
                검색 결과 초기화
              </button>
            </div>
          )}
          <div className="courses__navbar__pagination">
            <div className="courses__navbar__pagination-text">
              {pageNum} 페이지
            </div>
            <Pagination
              pages={pages}
              pageNum={pageNum}
              setPageNum={setPageNum}
            />
          </div>
        </div>
        <div className="courses__list">
          {coursesPerPage.length === 0 && <Skeleton length={9} />}
          {coursesPerPage.map((course) => (
            <Course key={course._id} course={course} />
          ))}
        </div>
      </div>
    </StyledCourses>
  );
};

export default Courses;

const StyledCourses = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 300;
  max-width: 1500px;
  margin: auto;
  min-height: calc(100vh - 202px);

  .wrapper {
    display: flex;
    justify-content: center;
  }

  .courses__navbar {
    position: sticky;
    top: 71px;
    width: 175px;
    height: 100%;
    padding: 5px 10px;
    margin-right: 10px;
    background-color: #eee;

    .MuiTypography-body1 {
      font-family: "Noto Sans KR", sans-serif;
      font-weight: 300;
    }

    &__search-init {
      &__btn {
        font-family: "Noto Sans KR", sans-serif;
        font-weight: 300;
        width: 100%;
        color: #fff;
        padding: 5px 15px;
        margin: 10px 0;
        border: none;
        outline: none;
        background-color: #272c48;
        border-radius: 5px;
        letter-spacing: 1.2px;
        opacity: 0.8;
        cursor: pointer;

        &:hover {
          opacity: 1;
        }
      }
    }

    &__pagination {
      margin: 5px 0;
      text-align: center;

      &-text {
        font-size: 15px;
        margin-bottom: 7px;
      }
    }
  }

  .courses__list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    flex: 0.94;
  }

  @media (max-width: 1024px) {
    min-width: 380px;

    .wrapper {
      flex-direction: column;
      align-items: center;

      .courses__navbar {
        top: 0px;
        z-index: 2;
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-right: 0;
        padding: 10px 0;

        &__pagination {
          margin-right: 10px;
        }
      }

      .MuiFormControlLabel-root {
        flex-direction: column;
        margin: 0;

        &:first-child {
          margin-left: 10px;
        }
      }

      .courses__list {
        justify-content: center;
      }
    }
  }
`;

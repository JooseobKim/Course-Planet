import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Course from "../../components/Course";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useLocation } from "react-router";
import Pagination from "../../components/Pagination";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { COURSE_TYPES } from "../../redux/actions/courseAction";
import Skeleton from "../../components/Skeleton";

const pageRegex = (page) => {
  const re = /[0-9]/g;
  return page.match(re);
};

const Courses = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    course: { search_courses },
    alert,
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
    if (pageNum <= 0 || (totalPage !== 0 && pageNum > totalPage)) setPageNum(1);
  }, [pageNum, totalPage]);

  useEffect(() => {
    if (!alert.loading) {
      if (search_courses.length === 0) {
        const getCourses = async () => {
          const res = await axios.get(
            `/courses?page=${pageNum}&platform=${JSON.stringify(checkedState)}`
          );
          setCoursesPerPage(res.data.courses);
          setTotalPage(res.data.totalPage);
        };
        getCourses();
      } else {
        setTotalPage(Math.ceil(search_courses.length / 12));

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
      }
    }
  }, [checkedState, pageNum, search_courses, alert.loading]);

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
          {search_courses.length !== 0 && (
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
          {coursesPerPage.length === 0 ? (
            <Skeleton loadingProp={true} length={12} gridResponsive={true} />
          ) : (
            coursesPerPage.map((course) => (
              <Course key={course._id} course={course} gridResponsive={true} />
            ))
          )}
        </div>
      </div>
    </StyledCourses>
  );
};

export default Courses;

const StyledCourses = styled.div`
  font-weight: 300;
  max-width: 1500px;
  margin: auto;
  min-height: calc(100vh - 202px);

  .wrapper {
    display: flex;
  }

  .courses__navbar {
    position: sticky;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    top: 71px;
    width: 175px;
    height: 100%;
    padding: 5px 10px;
    background-color: #fff;

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
    flex: 1;
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 10px;
    width: 100%;
    margin: 5px 0;
  }

  @media (max-width: 1024px) {
    min-width: 380px;

    .wrapper {
      flex-direction: column;
      align-items: center;

      .courses__navbar {
        z-index: 2;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        margin-right: 0;
        padding: 10px 0;
        top: 71px;

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

  @media (max-width: 768px) {
    .wrapper {
      .courses__navbar {
        top: 0px;
      }
    }

    .courses__navbar {
      &__pagination {
        max-width: 315px;
      }
    }
  }
`;

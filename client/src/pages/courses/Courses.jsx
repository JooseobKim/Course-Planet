import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Course from "../../components/Course";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useLocation } from "react-router";
import Pagination from "../../components/Pagination";
import axios from "axios";

const pageRegex = (page) => {
  const re = /[0-9]/g;
  return page.match(re);
};

const Courses = () => {
  const location = useLocation();

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
    const getCourses = async () => {
      const res = await axios.get(
        `/courses?page=${pageNum}&platform=${JSON.stringify(checkedState)}`
      );
      setCoursesPerPage(res.data.courses);
      setTotalPage(res.data.totalPage);
    };
    getCourses();

    if (pageNum <= 0 || pageNum > totalPage) setPageNum(1);
  }, [checkedState, pageNum, totalPage]);

  return (
    <StyledCourses>
      <div className="wrapper">
        <div className="courses__navbar">
          <label htmlFor="courses__navbar__select"></label>
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
          {coursesPerPage.map((course) => (
            <Course course={course} />
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
    margin-right: 30px;
    background-color: #eee;

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
    flex: 0.9;
  }
`;

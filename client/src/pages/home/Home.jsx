import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import CoursesView from "../../components/CoursesView";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecentAddCourses,
  getMostReviewCourses,
  getRecentReviewCourses,
  searchCourses,
} from "../../redux/actions/courseAction";
import { useHistory } from "react-router-dom";

const Home = () => {
  const {
    course: {
      get_recent_add_courses,
      most_review_courses,
      recent_review_courses,
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (
      getRecentAddCourses.length === 0 &&
      most_review_courses.length === 0 &&
      recent_review_courses.length === 0
    ) {
      dispatch(getRecentAddCourses());
      dispatch(getMostReviewCourses());
      dispatch(getRecentReviewCourses());
    }
  }, [dispatch, most_review_courses.length, recent_review_courses.length]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!searchValue) return;

    dispatch(searchCourses({ searchValue }));
    history.push("/courses");
  };

  const handleOnChnage = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div style={{ backgroundColor: "#ecebf6" }}>
        <StyledSearchContainer>
          <h3 className="search-title">
            리뷰를 작성하고 싶은 강좌의 이름을 검색해주세요.
          </h3>
          <form className="search" onSubmit={handleOnSubmit}>
            <label htmlFor="search-input" className="search-input__label">
              <SearchIcon />
            </label>
            <input
              type="text"
              id="search-input"
              className="search__input"
              name="searchValue"
              value={searchValue}
              onChange={handleOnChnage}
              placeholder="검색어를 입력하세요."
            />
            <button type="submit" className="search__button">
              검색
            </button>
          </form>
        </StyledSearchContainer>
      </div>
      <div className="courses-view" style={{ margin: "20px 0" }}>
        <CoursesView
          get_recent_add_courses={get_recent_add_courses}
          most_review_courses={most_review_courses}
          recent_review_courses={recent_review_courses}
        />
      </div>
    </>
  );
};

export default Home;

const StyledSearchContainer = styled.section`
  font-family: "Noto Sans KR", sans-serif;
  max-width: 1500px;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;

  .search-title {
    color: #272c48;
    font-weight: 500;
    letter-spacing: 1.5px;
    margin-bottom: 15px;
  }

  .search {
    width: 720px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

    &-input__label {
      height: 40px;
      padding: 0 7px;
      border-right: 2px solid #ecebf6;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      background-color: #fff;
      display: flex;
      align-items: center;
    }

    &__input {
      font-size: 15px;
      flex: 1;
      height: 40px;
      padding: 0 10px;
      border: none;
      outline: none;
      opacity: 0.8;

      &:hover,
      &:focus {
        opacity: 1;
      }
    }

    &__button {
      border: none;
      height: 40px;
      padding: 0 15px;
      border-left: 2px solid #ecebf6;
      background-color: #fff;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      cursor: pointer;
    }
  }
`;

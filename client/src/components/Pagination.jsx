import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COURSE_TYPES } from "../redux/actions/courseAction";

const Pagination = ({ pages, pageNum, dispatch }) => {
  return (
    <StyledPagination>
      {pages.map((pageIndex) => (
        <Link key={pageIndex} to={`/courses?page=${pageIndex + 1}`}>
          <button
            onClick={() => {
              dispatch({
                type: COURSE_TYPES.PAGE,
                payload: pageIndex + 1,
              });
              window.scrollTo({ top: 0 });
            }}
            className={`pagination__button ${
              pageNum === pageIndex + 1 ? "active" : ""
            }`}
          >
            {pageIndex + 1}
          </button>
        </Link>
      ))}
    </StyledPagination>
  );
};

export default Pagination;

const StyledPagination = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  .pagination__button {
    width: 31px;
    border: none;
    outline: none;
    padding: 3px 0;
    margin: 2px;
    border-radius: 3px;
    cursor: pointer;

    &.active {
      background-color: #272c48;
      color: #fff;
    }

    &:hover {
      background-color: #272c48;
      color: #fff;
    }
  }
`;

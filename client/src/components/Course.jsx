import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Course = ({ course, gridResponsive }) => {
  let sliceDescription;
  let sliceTitle;

  if (course.description.length > 115)
    sliceDescription = course.description.slice(0, 115) + " ...";

  if (course.title.length > 68) sliceTitle = course.title.slice(0, 68) + " ...";

  return (
    <StyledCourse gridResponsive={gridResponsive}>
      <div className="course">
        <div className="course__image">
          <img src={course.image} alt={`${course.title} img`} />
        </div>
        <div className="course__title">
          <span>{course.title.length > 68 ? sliceTitle : course.title}</span>
        </div>
        <div className="course__description">
          <p>
            {course.description.length > 125
              ? sliceDescription
              : course.description}
          </p>
        </div>
        <div className="course-content">
          <div className="course-content__instructor">
            강사 <span>{course.instructor}</span>
          </div>
          <div className="course-content__price-review">
            <div className="course-content__price-review__price">
              가격 <span>{course.price}</span>
            </div>
            <div className="course-content__price-review__review">
              강의 리뷰 <span>{course.review?.length}</span>
            </div>
          </div>
        </div>
        <div className="course__url">
          <a
            href={course.url}
            target="_blank"
            rel="noreferrer"
            className="course__url__move-homepage"
          >
            강의 홈페이지로 이동
          </a>
          <Link
            to={`/courses/${course._id}`}
            className="course__url__move-review"
          >
            리뷰 작성하기
          </Link>
        </div>
      </div>
    </StyledCourse>
  );
};

export default Course;

const StyledCourse = styled.div`
  font-weight: 300;
  grid-column: ${(props) => props.gridResponsive && "span 3 / span 3"};

  .course {
    position: relative;
    width: ${(props) => (props.gridResponsive ? "100%" : "375px")};
    min-height: 375px;
    font-size: 15px;
    overflow: hidden;

    &__image {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 0 5px;

      img {
        width: 100%;
        height: 179px;
        object-fit: contain;
      }
    }

    &__title {
      height: 30px;
      text-align: center;
      padding: 5px 10px;
    }

    &__description {
      min-height: 72px;
      padding: 5px 7px;
      line-height: 1.2;
    }

    &-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 10px;

      &__instructor {
      }

      &__price-review {
        &__price {
          text-align: end;
        }

        &__review {
          margin-top: 5px;
          text-align: end;
        }
      }
    }

    &__url {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      width: ${(props) => (props.gridResponsive ? "100%" : "375px")};
      height: 189px;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 7px;
      overflow: hidden;
      opacity: 0;

      &__move-homepage {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #242424;
        opacity: 0.6;
        text-decoration: none;
        font-weight: 400;
        font-size: 14px;
        color: #e5e5e5;

        &:hover {
          opacity: 0.9;
        }
      }

      &__move-review {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #242424;
        opacity: 0.6;
        text-decoration: none;
        font-weight: 400;
        font-size: 14px;
        color: #e5e5e5;

        &:hover {
          opacity: 0.9;
        }
      }

      &:hover {
        opacity: 1;
      }
    }
  }

  @media (max-width: 1536px) {
    grid-column: ${(props) => props.gridResponsive && "span 4 / span 4"};
  }
  @media (max-width: 1024px) {
    grid-column: ${(props) => props.gridResponsive && "span 6 / span 6"};
  }
  @media (max-width: 768px) {
    grid-column: ${(props) => props.gridResponsive && "span 12 / span 12"};
  }
`;

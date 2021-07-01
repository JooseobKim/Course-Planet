import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getCourse } from "../../redux/actions/courseAction";

import Review from "../../components/Review";

// dummy data
import reviews from "../../_dummyData/reviews.json";

const CourseDetail = () => {
  const {
    course: { get_course },
  } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();

  const [detailCourse, setDetailCourse] = useState({});

  useEffect(() => {
    dispatch(getCourse({ courses: get_course, id }));

    get_course.forEach((course) => {
      if (course._id === id) setDetailCourse(course);
    });
  }, [dispatch, id, get_course]);

  return (
    <StyledCourseDetail>
      <div className="course-detail">
        <div className="course-detail__image">
          <img src={detailCourse.image} alt={`${detailCourse.title} img`} />
        </div>
        <div className="course-detail__info">
          <div className="course-detail__info__title">{detailCourse.title}</div>
          <div className="course-detail__info__description">
            {detailCourse.description}
          </div>
          <div className="course-detail__info-inner">
            <div className="course-detail__info-inner__instructor">
              {detailCourse.instructor}
            </div>
            <div className="course-detail__info-inner__price-review">
              <div className="course-detail__info-inner__price-review__price">
                {detailCourse.price}
              </div>
              <div className="course-detail__info-inner__price-review__review">
                강의 리뷰
                <span>{detailCourse.review?.length}</span>
              </div>
            </div>
          </div>
          <div className="course-detail__info__link">
            강의 링크
            <a href={detailCourse.url}>{detailCourse.url}</a>
          </div>
          <div className="course-detail__info__platform">
            강의 플랫폼
            {detailCourse.platform === "inflearn" ? (
              <span className="course-detail__info__platform__inflearn">
                인프런
              </span>
            ) : (
              detailCourse.platform === "fastcampus" && (
                <span className="course-detail__info__platform__fastcampus">
                  패스트캠퍼스
                </span>
              )
            )}
          </div>
        </div>
      </div>
      <div className="review-container">
        <div className="review-container-sort">
          <select className="review-container-sort__condition">
            <option value="recent">최신순</option>
            <option value="lastest">오래된순</option>
            <option value="likes">좋아요순</option>
          </select>
        </div>
        {reviews.map((review) => (
          <Review review={review} />
        ))}
      </div>
    </StyledCourseDetail>
  );
};

export default CourseDetail;

const StyledCourseDetail = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 300;
  max-width: 1500px;
  margin: auto;
  display: flex;
  min-height: calc(100vh - 201px);

  .course-detail {
    position: sticky;
    top: 70px;
    height: 625px;
    flex: 1.2;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    &__image {
      margin: 20px;

      img {
        width: 560px;
        height: 365px;
        object-fit: contain;
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 10px;

      &__title {
      }

      &__description {
        margin: 10px 0;
        line-height: 1.3;
      }

      &-inner {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__instructor {
        }

        &__price-review {
          &__price {
            text-align: end;
            margin-bottom: 5px;
          }

          &__review {
            text-align: end;

            span {
              margin-left: 5px;
            }
          }
        }
      }

      &__link {
        margin: 10px 0;

        a {
          opacity: 0.7;
          color: #272c48;
          margin-left: 10px;

          &:hover {
            opacity: 1;
          }
        }
      }

      &__platform {
        margin: 10px 0;

        &__inflearn {
          font-weight: 500;
          padding: 5px;
          background-color: #00c471;
          color: #fff;
          border-radius: 5px;
          margin-left: 10px;
        }

        &__fastcampus {
          font-weight: 500;
          padding: 5px;
          background-color: #ed234b;
          color: #fff;
          border-radius: 5px;
          margin-left: 10px;
        }
      }
    }
  }

  .review-container {
    flex: 1.8;

    &-sort {
      margin: 8px 0;
      padding: 0 15px;
      text-align: end;

      &__condition {
        font-family: "Noto Sans KR", sans-serif;
        font-weight: 400;
        border: none;
        outline: none;
      }
    }
  }
`;

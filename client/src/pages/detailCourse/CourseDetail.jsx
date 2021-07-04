import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getCourse } from "../../redux/actions/courseAction";
import ReviewModal from "../../components/ReviewModal";

import Review from "../../components/Review";

const CourseDetail = () => {
  const {
    course: { get_course },
    auth,
  } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();

  const [detailCourse, setDetailCourse] = useState({});
  const [viewReview, setViewReview] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [existReview, setExistReview] = useState(true);
  const [myReview, setMyReview] = useState();
  console.log(myReview);

  useEffect(() => {
    dispatch(getCourse({ courses: get_course, id }));

    get_course.forEach((course) => {
      if (course._id === id) setDetailCourse(course);
    });
  }, [dispatch, id, get_course]);

  useEffect(() => {
    const notExistReview = detailCourse.review?.every((review) => {
      return auth.user && review.owner._id !== auth.user?._id;
    });

    if (notExistReview) setExistReview(false);
    else setExistReview(true);

    if (detailCourse.review?.length === 0) return setMyReview();

    detailCourse.review?.forEach((review) => {
      if (auth.user && review.owner._id === auth.user._id) {
        setMyReview({ ...review });
      }
    });
  }, [detailCourse.review, auth.user]);

  return (
    <StyledCourseDetail viewReview={viewReview}>
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
        <div className="review-container__create-review">
          <button
            className="review-container__create-review__button"
            onClick={() => setReviewModal(!reviewModal)}
            disabled={
              !auth.token ? true : existReview && existReview ? true : false
            }
          >
            리뷰 작성하기
          </button>
          {viewReview && (
            <span style={{ fontSize: "15px" }}>
              {!auth.token
                ? "* 리뷰는 로그인 후 작성하실 수 있습니다."
                : existReview && existReview
                ? "* 리뷰를 이미 작성하였습니다."
                : ""}
            </span>
          )}
          {!viewReview && (
            <button
              className="review-container__create-review__view-button"
              onClick={() => setViewReview(true)}
            >
              리뷰 조회하기
            </button>
          )}
        </div>
        <div className="review-container__sort">
          <select className="review-container__sort__condition">
            <option value="recent">최신순</option>
            <option value="lastest">오래된순</option>
            <option value="likes">좋아요순</option>
          </select>
        </div>
        {detailCourse.review?.map((item) => (
          <Review
            review={item}
            detailCourse={detailCourse}
            auth={auth}
            setReviewModal={setReviewModal}
            myReview={myReview}
          />
        ))}
      </div>
      {reviewModal && (
        <ReviewModal
          setReviewModal={setReviewModal}
          auth={auth}
          courseId={id}
          detailCourse={detailCourse}
          setViewReview={setViewReview}
          myReview={myReview}
        />
      )}
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
    position: relative;

    &__create-review {
      position: absolute;
      display: flex;
      flex-direction: ${(props) => !props.viewReview && "column"};
      background-color: ${(props) => !props.viewReview && "rgba(0, 0, 0, 0.8)"};
      width: ${(props) => !props.viewReview && "100%"};
      height: ${(props) => !props.viewReview && "100%"};
      margin-top: ${(props) => props.viewReview && "3px"};
      margin-left: ${(props) => props.viewReview && "10px"};
      justify-content: ${(props) => (props.viewReview ? "flex-end" : "center")};
      align-items: ${(props) => (props.viewReview ? "flex-start" : "center")};
      z-index: 1;

      &__button,
      &__view-button {
        font-family: "Noto Sans KR", sans-serif;
        font-weight: 500;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 10px 18px;
        border-radius: 5px;
        background-color: #ecebf6;
        color: #272c48;
        transform: scale(0.95);
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        transition: all 0.3s;

        &:first-child {
          margin-bottom: 5px;
        }

        &:hover {
          transform: scale(1);
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }

        &:disabled {
          cursor: not-allowed;
          background-color: #999;

          &:hover {
            transform: scale(0.95);
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          }
        }
      }
    }

    &__sort {
      text-align: end;
      margin: 10px 0;
      padding: 0 15px;

      &__condition {
        font-family: "Noto Sans KR", sans-serif;
        font-weight: 400;
        border: none;
        outline: none;
        cursor: pointer;
      }
    }
  }
`;
import React from "react";
import moment from "moment";
import Rating from "@material-ui/lab/Rating";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ReviewDetailUser = ({ review }) => {
  const difficultyValue = (value) => {
    if (value === "easy") return "쉬움";
    if (value === "normal") return "보통";
    if (value === "hard") return "어려움";
    if (value === "expert") return "전문가";
  };

  return (
    <StyledReviewDetailUser>
      <div className="review-detail-user">
        <div className="review-detail-user__course">
          <div className="review-detail-user__course__image">
            <img
              src={review.courseId.image}
              alt={`${review.courseId.title} banner`}
            />
          </div>
          <div className="review-detail-user__course__title">
            <Link to={`/courses/${review.courseId._id}`}>
              {review.courseId.title}
            </Link>
          </div>
        </div>
        <div className="review-detail-user__review">
          <div className="review-detail-user__review__merit">
            <span>장점</span>
            <div>{review.merit}</div>
          </div>
          <div className="review-detail-user__review__demerit">
            <span>단점</span>
            <div>{review.demerit}</div>
          </div>
          <div className="review-detail-user__review-inner">
            <div className="review-detail-user__review-inner__created-at">
              {moment(review.createdAt).fromNow()}
            </div>
            <div className="review-detail-user__review-inner__difficulty">
              {difficultyValue(review.difficulty)}
            </div>
            <div className="review-detail-user__review-inner__rating">
              <Rating value={review.rating} readOnly />
            </div>
          </div>
        </div>
      </div>
    </StyledReviewDetailUser>
  );
};

export default ReviewDetailUser;

const StyledReviewDetailUser = styled.div`
  .review-detail-user {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &__course {
      display: flex;

      &__image {
        width: 100px;
        margin-left: 7px;

        img {
          width: 100%;
        }
      }
      &__title {
        display: flex;
        text-align: center;
        align-items: center;
        width: 200px;
        margin: 0 10px;

        a {
          color: #272c48;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    &__review {
      width: 600px;
      margin: 10px 5px 10px 0;

      &__merit {
        margin: 5px 0;
        word-break: break-all;
        display: flex;
        flex-direction: column;
        line-height: 1.1;

        span {
          color: #799fcb;
          font-weight: 500;
          margin-bottom: 5px;
        }
      }

      &__demerit {
        margin: 10px 0;
        word-break: break-all;
        display: flex;
        flex-direction: column;
        line-height: 1.1;

        span {
          color: #f9665e;
          font-weight: 500;
          margin-bottom: 5px;
        }
      }

      &-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__created-at {
        }
        &__rating {
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .review-detail-user {
      &__course {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
        flex: 0.4;

        &__title {
          width: 100%;
          text-align: start;
          margin: 5px 0;
        }
      }

      &__review {
        flex: 0.6;
      }
    }
  }

  @media (max-width: 768px) {
    .review-detail-user {
      flex-direction: column;

      &__course {
        padding: 15px 0 0;
        width: 100%;

        &__title {
          justify-content: center;
        }
      }
      &__review {
        width: 100%;

        &__merit,
        &-inner {
          margin: 0 5px;
        }

        &__demerit {
          margin: 10px 5px;
        }
      }
    }
  }
`;

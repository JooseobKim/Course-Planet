import React from "react";
import styled from "styled-components";

// dummy data
import users from "../_dummyData/users.json";

const Review = ({ review }) => {
  const user = users.filter((user) => review.id === user.id);

  return (
    <StyledReview>
      <div className="review">
        <div className="review__owner-info">
          <div className="review__owner-info-inner">
            <img src={user[0].avatar} alt="" />
            <div className="review__owner-info-inner__nickname-createdAt">
              <div className="review__owner-info-inner__nickname-createdAt__nickname">
                {user[0].nickname}
              </div>
              <div className="review__owner-info__nickname-createdAt__createdAt">
                {review.createdAt}
              </div>
            </div>
          </div>
          <div className="review__owner-info__likes-rating-difficulty">
            <div className="review__owner-info__likes-rating-difficulty__likes">
              좋아요
              <span>{review.likes.length}</span>
            </div>
            <div className="review__owner-info__likes-rating-difficulty-inner">
              <div className="review__owner-info__likes-rating-difficulty-inner__rating">
                {review.rating}
              </div>
              <div className="review__owner-info__likes-rating-difficulty-inner__difficulty">
                강의 난이도
                <span>{review.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="review__merit-demerit">
          <div className="review__merit-demerit__merit">
            <span>장점</span>
            {review.merit}
          </div>
          <div className="review__merit-demerit__demerit">
            <span>단점</span>
            {review.demerit}
          </div>
        </div>
      </div>
    </StyledReview>
  );
};

export default Review;

const StyledReview = styled.div`
  margin: 15px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  .review {
    display: flex;

    &__owner-info {
      flex: 0.5;
      display: flex;
      flex-direction: column;
      padding: 10px 5px 10px 10px;

      &-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;

        img {
          width: 50px;
          height: 50px;
          border-radius: 5px;
          object-fit: cover;
        }

        &__nickname-createdAt {
          display: flex;
          flex-direction: column;
          align-items: flex-end;

          &__nickname {
            margin-bottom: 5px;
          }
        }
      }

      &__likes-rating-difficulty {
        display: flex;
        justify-content: space-between;
        padding: 5px;

        &__likes {
          display: flex;
          justify-content: center;
          align-items: center;

          span {
            margin-left: 5px;
            font-weight: 500;
          }
        }

        &-inner {
          text-align: end;

          &__rating {
            margin-bottom: 5px;
          }

          &__difficulty {
            span {
              margin-left: 5px;
              font-weight: 500;
            }
          }
        }
      }
    }

    &__merit-demerit {
      flex: 1.5;
      padding: 0 5px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      &__merit {
        display: flex;
        flex-direction: column;
        margin: 5px 0;

        span {
          font-weight: 500;
          padding: 3px 0 5px;
          color: #799fcb;
        }
      }

      &__demerit {
        display: flex;
        flex-direction: column;
        margin: 5px 0;

        span {
          font-weight: 500;
          padding: 3px 0 5px;
          color: #f9665e;
        }
      }
    }
  }
`;

import React from "react";
import styled from "styled-components";

const ReviewSkeleton = () => {
  return (
    <StyledReviewSkeleton>
      <div className="review-skeleton">
        <div className="review-skeleton-info">
          <div className="review-skeleton-info__username">
            <div></div>
          </div>
          <div className="review-skeleton-info__avatar">
            <div></div>
          </div>
        </div>
        <div className="review-skeleton-review">
          <div className="review-skeleton-review-inner">
            <div></div>
          </div>
          <div className="review-skeleton-review__more-inner">
            <div></div>
          </div>
        </div>
      </div>
    </StyledReviewSkeleton>
  );
};

export default ReviewSkeleton;

const StyledReviewSkeleton = styled.div`
  display: flex;
  justify-content: center;

  .review-skeleton {
    max-width: 950px;
    width: 100%;
    height: 434px;
    animation: skeleton 1s ease infinite alternate;

    @keyframes skeleton {
      to {
        opacity: 0.6;
      }
    }

    &-info {
      display: flex;
      flex-direction: column;
      align-items: center;

      &__username {
        width: 180px;
        height: 20px;
        margin: 15px 0 10px;
        border-radius: 5px;
        background-color: #999;
      }

      &__avatar {
        width: 125px;
        height: 125px;
        border-radius: 50%;
        background-color: #999;
      }
    }

    &-review {
      height: 265px;

      &-inner {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 222px;
        margin: 0 10px;

        div {
          width: 100%;
          height: 180px;
          border-radius: 5px;
          background-color: #999;
        }
      }

      &__more-inner {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        height: 43px;

        div {
          width: 64px;
          height: 31px;
          border-radius: 5px;
          background-color: #999;
        }
      }
    }
  }
`;

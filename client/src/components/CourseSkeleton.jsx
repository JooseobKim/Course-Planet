import React from "react";
import styled from "styled-components";

const CourseSkeleton = () => {
  return (
    <StyledCourseSkeleton>
      <div className="course-skeleton">
        <div className="course-skeleton__image">
          <div></div>
        </div>
        <div className="course-skeleton__info">
          <div className="course-skeleton__info__title">
            <div></div>
          </div>
          <div className="course-skeleton__info__description">
            <div></div>
          </div>
          <div className="course-skeleton__info-inner">
            <div className="course-skeleton__info-inner__instructor">
              <div></div>
            </div>
            <div className="course-skeleton__info-inner__price-review">
              <div className="course-skeleton__info-inner__price-review__price">
                <div></div>
              </div>
              <div className="course-skeleton__info-inner__price-review__review">
                <div></div>
              </div>
            </div>
          </div>
          <div className="course-skeleton__info__link">
            <div></div>
          </div>
          <div className="course-skeleton__info__platform">
            <div></div>
          </div>
        </div>
      </div>
    </StyledCourseSkeleton>
  );
};

export default CourseSkeleton;

const StyledCourseSkeleton = styled.div`
  flex: 1.2;

  .course-skeleton {
    padding: 20px;
    animation: skeleton 1s ease infinite alternate;

    @keyframes skeleton {
      to {
        opacity: 0.6;
      }
    }

    &__image {
      width: 100%;
      height: 365px;
      border-radius: 5px;
      background-color: #999;
    }

    &__info {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 20px;
      margin-top: 20px;

      &__title {
        width: 80%;
        height: 20px;
        background-color: #999;
        border-radius: 3px;
      }

      &__description {
        width: 95%;
        height: 20px;
        background-color: #999;
        border-radius: 3px;
        margin: 7px 0;
      }

      &-inner {
        width: 95%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__instructor {
          width: 100px;
          height: 20px;
          background-color: #999;
          border-radius: 3px;
        }

        &__price-review {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;

          &__price {
            width: 100px;
            height: 20px;
            text-align: end;
            background-color: #999;
            border-radius: 3px;
          }

          &__review {
            width: 125px;
            height: 20px;
            margin-top: 5px;
            background-color: #999;
            border-radius: 3px;
          }
        }
      }

      &__link {
        width: 90%;
        height: 20px;
        margin: 7px 0;
        background-color: #999;
        border-radius: 3px;
      }

      &__platform {
        width: 40%;
        height: 20px;
        background-color: #999;
        border-radius: 3px;
      }
    }
  }

  @media (max-width: 1024px) and (min-width: 768px) {
    .course-skeleton {
      display: flex;

      &__image {
        max-width: 400px;
        min-width: 300px;
        height: 248px;
      }

      &__info {
        width: 100%;
        justify-content: center;
        margin-top: 0;
      }
    }
  }
`;

import React from "react";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";

const Skeleton = ({ loading }) => {
  const skeletonFrom = (
    <>
      <StyledSkeleton loading={loading}>
        <div className="skeleton">
          <Checkbox size="small" color="primary" disabled />
          <div className="skeleton__image">
            <div></div>
          </div>
          <div className="skeleton__title">
            <div></div>
          </div>
          <div className="skeleton__description">
            <div></div>
          </div>
          <div className="skeleton-content">
            <div className="skeleton-content__instructor">
              <div></div>
            </div>
            <div className="skeleton-content__price-review">
              <div className="skeleton-content__price-review__price">
                <div></div>
              </div>
              <div className="skeleton-content__price-review__review">
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </StyledSkeleton>
    </>
  );

  const formArray = new Array(4).fill(skeletonFrom);

  return (
    <>
      <div style={{ display: "flex" }}>{formArray.map((form) => form)}</div>
    </>
  );
};

export default Skeleton;

const StyledSkeleton = styled.div`
  width: 375px;
  height: 375px;
  opacity: 0.5;
  animation: ${(props) =>
    props.loading && "skeleton 1s ease infinite alternate"};

  @keyframes skeleton {
    to {
      opacity: 0.8;
    }
  }

  .skeleton {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__image {
      width: 300px;
      height: 179px;
      background-color: #999;
    }

    &__title {
      width: 325px;
      height: 35px;
      margin: 7px 0;
      background-color: #999;
    }

    &__description {
      width: 325px;
      height: 90px;
      margin-bottom: 3px;
      background-color: #999;
    }

    &-content {
      width: 325px;
      height: 45px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__instructor {
        width: 75px;
        height: 15px;
        background-color: #999;
      }

      &__price-review {
        &__price {
          width: 100px;
          height: 15px;
          background-color: #999;
          margin-bottom: 5px;
        }

        &__review {
          width: 100px;
          height: 15px;
          background-color: #999;
        }
      }
    }
  }
`;

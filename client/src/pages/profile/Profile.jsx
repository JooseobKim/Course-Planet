import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsByUsername } from "../../redux/actions/userAction";
import ReviewDetailUser from "../../components/ReviewDetailUser";
import styled from "styled-components";
import ReviewSkeleton from "../../components/ReviewSkeleton";

const Profile = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const {
    review: { user_reviews },
  } = useSelector((state) => state);

  const [userReviews, setUserReviews] = useState([]);
  const [sliceNum, setSliceNum] = useState(1);

  useEffect(() => {
    if (user_reviews.every((review) => review.owner.username !== username))
      dispatch(getReviewsByUsername({ username }));
    else {
      setUserReviews(
        user_reviews.filter((review) => review.owner.username === username)
      );
    }
  }, [dispatch, username, user_reviews]);

  return (
    <StyledProfile>
      {userReviews[0]?.owner.avatar ? (
        <div className="profile">
          <div className="profile-info">
            <span className="profile-info__username">
              {userReviews[0]?.owner.username} 님의 리뷰
            </span>
            <div className="profile-info__avatar">
              <img
                src={userReviews[0]?.owner.avatar}
                alt={`${userReviews[0]?.owner.username} avatar`}
              />
            </div>
          </div>
          <div className="profile-review">
            {userReviews.slice(0, sliceNum).map((review) => (
              <div className="profile-review-inner" key={review._id}>
                <ReviewDetailUser review={review} />
              </div>
            ))}
            <div className="profile-review__more-inner">
              {sliceNum < userReviews.length && (
                <button
                  onClick={() => {
                    if (sliceNum >= userReviews.length) return;
                    setSliceNum(sliceNum + 1);
                  }}
                  className="profile-review__more-inner__btn"
                >
                  더보기
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <ReviewSkeleton />
      )}
    </StyledProfile>
  );
};

export default Profile;

const StyledProfile = styled.div`
  font-weight: 400;
  max-width: 1500px;
  min-height: calc(100vh - 202px);
  margin: auto;

  .profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &__username {
        font-weight: 700;
        font-size: 18px;
        margin: 15px 0 10px;
      }
      &__avatar {
        width: 125px;

        img {
          width: 100%;
          border-radius: 50%;
        }
      }
    }

    &-review {
      &-inner {
        margin: 20px 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      }

      &__more-inner {
        display: flex;
        justify-content: center;

        &__btn {
          font-family: "Noto Sans KR", sans-serif;
          font-weight: 400;
          padding: 7px 15px;
          margin: 0 0 10px;
          border: none;
          outline: none;
          border-radius: 5px;
          background-color: #ecebf6;
          transform: scale(0.95);
          opacity: 0.8;
          transition: all 0.3s;
          cursor: pointer;

          &:hover {
            transform: scale(1);
            opacity: 1;
            box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
          }
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .profile {
      &-review {
        width: 100%;

        &-inner {
          min-width: 380px;
          width: 97%;
          margin: 20px auto;
          left: 0;
          right: 0;
        }
      }
    }
  }
`;

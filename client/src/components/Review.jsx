import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import "moment/locale/ko";
import {
  deleteReview,
  likeReview,
  unlikeReview,
} from "../redux/actions/reviewAction";
import { useDispatch } from "react-redux";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Review = ({ review, detailCourse, auth, setReviewModal }) => {
  const { owner } = review;
  const dispatch = useDispatch();

  const [showMore, setShowMore] = useState(false);
  const [likeState, setLikeState] = useState(false);

  useEffect(() => {
    const existReviewLike = review.likes.find(
      (like) => like._id === auth.user?._id
    );
    if (existReviewLike) setLikeState(true);
  }, [auth.user?._id, review.likes]);

  const difficultyValue = (value) => {
    if (value === "easy") return "쉬움";
    if (value === "normal") return "보통";
    if (value === "hard") return "어려움";
    if (value === "expert") return "전문가";
  };

  const handleLike = async () => {
    if (!auth.token) return;

    dispatch(likeReview({ review, auth, detailCourse }));
    setLikeState(true);
  };

  const handleUnLike = async () => {
    if (!auth.token) return;

    dispatch(unlikeReview({ review, auth, detailCourse }));
    setLikeState(false);
  };

  return (
    <StyledReview>
      <div className="review">
        <div className="review__owner-info">
          <div className="review__owner-info-inner">
            <img
              src={
                owner?.avatar ||
                "https://res.cloudinary.com/duw5jvlb4/image/upload/v1624383950/samples/no-image_dfpama.png"
              }
              alt=""
            />
            <div className="review__owner-info-inner__nickname-createdAt">
              <div className="review__owner-info-inner__nickname-createdAt__nickname">
                {owner?.username || "탈퇴 유저"}
              </div>
              <div className="review__owner-info__nickname-createdAt__createdAt">
                {moment(review.createdAt).fromNow()}
              </div>
            </div>
          </div>
          <div className="review__owner-info__likes-rating-difficulty">
            <div className="review__owner-info__likes-rating-difficulty__likes">
              {likeState ? (
                <FavoriteIcon
                  onClick={handleUnLike}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <FavoriteBorderIcon
                  onClick={handleLike}
                  style={{ cursor: "pointer" }}
                />
              )}
              <span>{review.likes.length}</span>
            </div>
            <div className="review__owner-info__likes-rating-difficulty-inner">
              <div className="review__owner-info__likes-rating-difficulty-inner__rating">
                <Rating value={review.rating} readOnly />
              </div>
              <div className="review__owner-info__likes-rating-difficulty-inner__difficulty">
                강의 난이도
                <span>{difficultyValue(review.difficulty)}</span>
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
        <div className="review__more">
          <MoreHorizIcon
            onClick={() => setShowMore(!showMore)}
            style={{ cursor: "pointer" }}
          />
        </div>
        {auth?.token
          ? auth.user._id === review.owner?._id
            ? showMore && (
                <div
                  className="review__more__dropdown"
                  onMouseOver={() => setShowMore(true)}
                  onMouseLeave={() => setShowMore(false)}
                >
                  <div
                    className="review__more__dropdown__item"
                    onClick={() => {
                      setReviewModal(true);
                      setShowMore(false);
                    }}
                  >
                    리뷰 수정
                  </div>
                  <div
                    className="review__more__dropdown__item"
                    onClick={() => {
                      if (window.confirm("리뷰를 삭제하시겠습니까?"))
                        dispatch(
                          deleteReview({
                            detailCourse,
                            auth,
                            reviewId: review._id,
                          })
                        );
                    }}
                  >
                    리뷰 삭제
                  </div>
                </div>
              )
            : showMore && (
                <div
                  className="review__more__dropdown"
                  onMouseOver={() => setShowMore(true)}
                  onMouseLeave={() => setShowMore(false)}
                >
                  <div
                    className="review__more__dropdown__item"
                    onClick={() => {
                      setShowMore(false);
                    }}
                  >
                    신고하기
                  </div>
                </div>
              )
          : showMore && (
              <div
                className="review__more__dropdown"
                onMouseOver={() => setShowMore(true)}
                onMouseLeave={() => setShowMore(false)}
              >
                <div
                  className="review__more__dropdown__item"
                  onClick={() => {
                    setShowMore(false);
                  }}
                >
                  신고하기
                </div>
              </div>
            )}
      </div>
    </StyledReview>
  );
};

export default Review;

const StyledReview = styled.div`
  margin: 15px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  .review {
    position: relative;
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
      padding: 5px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      max-width: 645px;

      &__merit {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 5px 0;
        line-height: 1.1;
        word-break: break-all;

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
        line-height: 1.1;
        word-break: break-all;

        span {
          font-weight: 500;
          padding: 3px 0 5px;
          color: #f9665e;
        }
      }
    }

    &__more {
      position: absolute;
      top: 0;
      right: 10px;

      &__dropdown {
        position: absolute;
        top: 20px;
        right: 5px;
        background-color: #8a8ba1;
        color: #ecebf6;
        line-height: 1.2;
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;

        &__item {
          font-size: 15px;
          padding: 7px 10px;

          &:first-child {
            border-bottom: 0.5px solid #ecebf6;
          }

          &:hover {
            background-color: #272c48;
          }
        }
      }
    }
  }
`;

import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import Rating from "@material-ui/lab/Rating";

const Review = ({ setReviewModal }) => {
  const initialState = {
    difficulty: "easy",
    merit: "",
    demerit: "",
    rating: 5,
  };
  const [reviewForm, setReviewForm] = useState(initialState);
  const { difficulty, merit, demerit, rating } = reviewForm;

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setReviewForm({ ...reviewForm, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <StyledReviewModal>
      <div className="modal">
        <span className="modal__title">리뷰 작성하기</span>
        <form onSubmit={handleOnSubmit}>
          <div className="modal__rating-difficulty">
            <div className="modal__rating-difficulty__rating">
              <span className="modal__rating-difficulty__rating-text">
                평점
              </span>
              <Rating
                name="rating"
                value={rating}
                onChange={(e, newValue) => {
                  const { name } = e.target;
                  setReviewForm({ ...reviewForm, [name]: newValue });
                }}
              />
            </div>
            <span className="modal__rating-difficulty__difficulty">
              <span>강의 난이도</span>
              <select
                name="difficulty"
                value={difficulty}
                onChange={handleOnChange}
              >
                <option value="easy">쉬움</option>
                <option value="normal">보통</option>
                <option value="hard">어려움</option>
                <option value="expert">전문가</option>
              </select>
            </span>
          </div>
          <div className="modal__merit-demerit">
            <div className="modal__merit-demerit__merit">
              <span className="modal__merit-demerit__merit__merit-text">
                장점
              </span>
              <textarea
                type="text"
                maxLength="500"
                minLength="30"
                rows={7}
                cols={70}
                placeholder="장점을 최소 30 글자 이상 입력해주세요."
                className="modal__merit-demerit__merit__merit-input"
                name="merit"
                value={merit}
                onChange={handleOnChange}
              />
            </div>
            <div className="modal__merit-demerit__demerit">
              <span className="modal__merit-demerit__demerit__demerit-text">
                단점
              </span>
              <textarea
                type="text"
                maxLength="500"
                minLength="30"
                rows={7}
                cols={70}
                placeholder="단점을 최소 30 글자 이상 입력해주세요."
                className="modal__merit-demerit__demerit__demerit-input"
                name="demerit"
                value={demerit}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <button type="submit" className="modal__submit-review">
            리뷰 등록하기
          </button>
        </form>
        <CloseIcon
          className="close-icon"
          onClick={() => setReviewModal(false)}
        />
      </div>
    </StyledReviewModal>
  );
};

export default Review;

const StyledReviewModal = styled.div`
  font-weight: 500;
  color: #272c48;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 600px;
  height: 600px;
  background-color: rgba(236, 235, 246, 0.98);
  border-radius: 5px;

  .modal {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .modal__title {
      font-size: 20px;
      margin-bottom: 15px;
    }

    form {
      display: flex;
      flex-direction: column;
    }

    &__rating-difficulty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__rating {
        display: flex;
        align-items: center;

        &-text {
          margin-right: 7px;
        }
      }
      &__difficulty {
        span {
          margin-right: 7px;
        }

        select {
          font-family: "Noto Sans KR", sans-serif;
          font-weight: 400;
          border: none;
          outline: none;
          background-color: #ecebf6;
          cursor: pointer;
        }
      }
    }

    &__merit-demerit {
      &__merit {
        display: flex;
        flex-direction: column;

        &__merit-text {
          margin: 15px 0;
          color: #799fcb;
        }
        &__merit-input {
          padding: 7px;
          border-radius: 5px;
          border: none;
          resize: none;
          outline: none;
        }
      }

      &__demerit {
        display: flex;
        flex-direction: column;

        &__demerit-text {
          margin: 15px 0;
          color: #f9665e;
        }
        &__demerit-input {
          padding: 7px;
          border-radius: 5px;
          border: none;
          resize: none;
          outline: none;
        }
      }
    }

    &__submit-review {
      border: none;
      margin-top: 15px;
      height: 35px;
      border-radius: 3px;
      background-color: #272c48;
      opacity: 0.7;
      color: #fff;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }
    }
  }

  .close-icon {
    position: absolute;
    color: #272c48;
    top: 12px;
    right: 12px;
    cursor: pointer;
  }
`;

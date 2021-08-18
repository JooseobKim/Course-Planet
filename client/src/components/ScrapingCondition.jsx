import React, { useEffect } from "react";
import styled from "styled-components";

const ScrapingCondition = ({ platform, condition, setCondition }) => {
  const { pageTo, pageFrom, order, category, search } = condition;

  useEffect(() => {
    const pageGap = pageTo - pageFrom;

    if (pageFrom > pageTo)
      setCondition({
        ...condition,
        pageTo: pageFrom,
      });

    if (pageGap >= 4)
      setCondition({ ...condition, pageFrom, pageTo: pageTo - 1 });
  }, [condition, setCondition, pageTo, pageFrom]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (Number(value)) setCondition({ ...condition, [name]: Math.abs(value) });
    else setCondition({ ...condition, [name]: value });
  };

  const InflearnCondition = () => (
    <StyledScrapingCondition>
      <div className="select-page">
        <span>페이지를 선택해주세요.</span>
        <input
          type="number"
          id="select-page__input-pageFrom"
          name="pageFrom"
          value={pageFrom}
          onChange={handleOnChange}
        />
        <label htmlFor="select-page__input-pageFrom">페이지 부터</label>
        <input
          type="number"
          id="select-page__input-pageTo"
          name="pageTo"
          value={pageTo}
          onChange={handleOnChange}
        />
        <label htmlFor="select-page__input-pageTo">페이지 까지</label>
      </div>
      <div className="select-order">
        <select
          className="select-order__list"
          name="order"
          value={order}
          onChange={handleOnChange}
        >
          <option className="select-order__list__item" value="recent">
            최신순
          </option>
          <option className="select-order__list__item" value="seq">
            추천순
          </option>
          <option className="select-order__list__item" value="popular">
            인기순
          </option>
          <option className="select-order__list__item" value="rating">
            평점순
          </option>
          <option className="select-order__list__item" value="famous">
            학생수순
          </option>
          {search && (
            <option className="select-order__list__item" value="search">
              검색순
            </option>
          )}
        </select>
      </div>
    </StyledScrapingCondition>
  );

  const FastcampusCondition = () => (
    <StyledScrapingCondition>
      <div className="select-category">
        <span className="select-category__title">카테고리를 선택해주세요.</span>
        <select
          className="select-category__list"
          name="category"
          value={category}
          onChange={handleOnChange}
        >
          <option
            className="select-category__list__item"
            value="category_online_programming"
          >
            프로그래밍 강의
          </option>
          <option
            className="select-category__list__item"
            value="category_online_datascience"
          >
            데이터 분석 강의
          </option>
          <option
            className="select-category__list__item"
            value="category_online_dgn"
          >
            디자인 강의
          </option>
          <option
            className="select-category__list__item"
            value="category_online_video"
          >
            영상&#47;3D 강의
          </option>
          <option
            className="select-category__list__item"
            value="category_online_finance"
          >
            부동산&#47;금융 강의
          </option>
          <option
            className="select-category__list__item"
            value="category_online_marketing"
          >
            마케팅 강의
          </option>
          <option
            className="select-category__list__item"
            value="category_online_biz"
          >
            업무 생산성 강의
          </option>
          <option
            className="select-category__list__item"
            value="category_online_invest"
          >
            투자&#47;재테크 강의
          </option>
        </select>
      </div>
    </StyledScrapingCondition>
  );

  if (platform === "inflearn") return <InflearnCondition />;
  if (platform === "fastcampus") return <FastcampusCondition />;
};

export default ScrapingCondition;

const StyledScrapingCondition = styled.div`
  color: #272c48;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;

  .select-page {
    display: flex;

    input[type="number"] {
      font-family: "Noto Sans KR", sans-serif;
      outline: none;
      margin: 0 10px;
      width: 32px;
      border: none;
      border-bottom: 1px solid #272c48;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        opacity: 1 !important;
      }
    }
  }

  .select-order {
    margin-left: 10px;

    &__list {
      font-family: "Noto Sans KR", sans-serif;
      height: 25px;
      border: none;
      border-bottom: 1px solid #272c48;
      outline: none;
      cursor: pointer;
    }
  }

  .select-category {
    margin-left: 10px;

    &__title {
      margin-right: 5px;
    }

    &__list {
      font-family: "Noto Sans KR", sans-serif;
      height: 25px;
      border: none;
      border-bottom: 1px solid #272c48;
      outline: none;
      cursor: pointer;
    }
  }

  .search-keyword {
    display: flex;
    justify-content: center;
    margin-left: 10px;

    &__input {
      background-color: #ecebf6;
      border-radius: 3px;
      padding: 7px 10px;
      margin-right: 5px;
      border: none;
      outline: none;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }

      &:focus {
        opacity: 1;
      }
    }
  }
`;

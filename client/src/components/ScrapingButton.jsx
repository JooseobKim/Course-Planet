import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  clearScrapingData,
  scrapingDataSave,
  scrapingFastcampusCourses,
  scrapingInflearnCourses,
} from "../redux/actions/courseAction";

const ScrapingButton = ({
  platform,
  courses,
  condition,
  checkState,
  setCheckState,
}) => {
  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state);

  const { order, pageFrom, pageTo, category } = condition;

  const [timeoutProp, setTimeoutProp] = useState(false);

  const notExistCheckedData = Object.entries(checkState).every(
    (item) => item[1] === false
  );

  let timeoutId;

  useEffect(() => {
    if (alert.errMsg || courses.length === 0) {
      clearTimeout(timeoutId);
      setTimeoutProp(false);
    }
  }, [alert.errMsg, timeoutId, courses.length]);

  const handleScraping = ({ order, pageFrom, pageTo, category }) => {
    setTimeoutProp(true);

    switch (platform) {
      case "inflearn":
        dispatch(
          scrapingInflearnCourses({
            order,
            pageFrom,
            pageTo,
            prev_courses: courses,
          })
        );
        break;
      case "fastcampus":
        dispatch(
          scrapingFastcampusCourses({
            category,
            prev_courses: courses,
          })
        );
        break;
      default:
        break;
    }

    timeoutId = setTimeout(() => {
      setTimeoutProp(false);
    }, 60000);
  };

  const handleSaveScrapingData = ({ courses }) => {
    dispatch(scrapingDataSave({ data: courses }));
  };

  const handleSaveAllCheckedData = ({ courses }) => {
    let checkedData;

    checkedData = courses.filter(
      (item, i) => checkState[Object.keys(checkState)[i]]
    );

    dispatch(scrapingDataSave({ data: checkedData }));
  };

  const handleCheckingAllData = () => {
    const checkAllData = {};

    for (const [key] of Object.entries(checkState)) {
      checkAllData[key] = true;
    }

    setCheckState(checkAllData);
  };

  const handleClearAllCheckedData = () => {
    const clearAllCheckedData = {};

    for (const [key] of Object.entries(checkState)) {
      clearAllCheckedData[key] = false;
    }

    setCheckState(clearAllCheckedData);
  };

  const handleClearAllScrapingData = () => {
    dispatch(clearScrapingData({ platform }));
  };

  const handleDisabledScraping = (scrapingPlatform) => {
    let disabled;

    switch (scrapingPlatform) {
      case "inflearn":
        if (timeoutProp || courses.length >= 96) disabled = true;
        break;
      case "fastcampus":
        if (timeoutProp || courses.length >= 50) disabled = true;
        break;
      default:
        disabled = true;
        break;
    }

    return disabled;
  };

  const handleDisabled = (scarpingSiteCourses, notExistCheckedData) => {
    let disabled = false;

    if (scarpingSiteCourses.length === 0 || notExistCheckedData)
      disabled = true;

    return disabled;
  };

  return (
    <StyledScrapingButton>
      <div className="scraping">
        <button
          onClick={() => handleScraping({ order, pageFrom, pageTo, category })}
          disabled={handleDisabledScraping(platform)}
        >
          {`${
            platform === "inflearn"
              ? "인프런 "
              : platform === "fastcampus" && "패스트캠퍼스 "
          }`}
          스크래핑
        </button>
        <button
          onClick={() => handleSaveScrapingData({ courses })}
          disabled={handleDisabled(courses)}
        >
          스크래핑 데이터 모두 저장
        </button>
        <button
          onClick={() => handleSaveAllCheckedData({ courses })}
          disabled={handleDisabled(courses, notExistCheckedData)}
        >
          체크된 데이터 저장
        </button>
        <button
          onClick={handleCheckingAllData}
          disabled={handleDisabled(courses)}
        >
          모든 데이터 체크 설정
        </button>
        <button
          onClick={handleClearAllCheckedData}
          disabled={handleDisabled(courses)}
        >
          모든 데이터 체크 해제
        </button>
        <button
          onClick={handleClearAllScrapingData}
          disabled={handleDisabled(courses)}
        >
          스크래핑 데이터 초기화
        </button>
      </div>
    </StyledScrapingButton>
  );
};

export default ScrapingButton;

const StyledScrapingButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;

  .scraping {
    button {
      font-family: "Noto Sans KR", sans-serif;
      color: #272c48;
      font-size: 15px;
      transform: scale(0.95);
      transition: all 0.3s;
      border: none;
      height: 35px;
      padding: 0 15px;
      border-radius: 5px;
      background-color: #ecebf6;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      cursor: pointer;

      &:hover {
        transform: scale(1);
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }

      &:disabled {
        background-color: #999;
        color: #ecebf6;
        cursor: not-allowed;

        &:hover {
          transform: scale(0.95);
        }
      }
    }
  }
`;

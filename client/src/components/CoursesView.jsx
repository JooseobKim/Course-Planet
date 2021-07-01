import React from "react";
import Course from "./Course";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import Skeleton from "./Skeleton";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

// dummyData [courses]
import coursesData from "../_dummyData/courses.json";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const CourseView = ({ get_courses }) => {
  return (
    <StyledCouresesView className="courses-wrapper">
      <div className="courses">
        <h3 className="courses-title">최긘에 추가된 강의</h3>
        {get_courses.length === 0 && <Skeleton loading={alert.loading} />}
        <Swiper slidesPerView={4} slidesPerGroup={4} navigation pagination>
          <div className="courses__data" style={{ display: "flex" }}>
            {get_courses.map((course) => (
              <SwiperSlide>
                <Course course={course} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
        <h3 className="courses-title">가장 최근에 리뷰가 작성된 강의</h3>
        <Swiper slidesPerView={4} slidesPerGroup={4} navigation pagination>
          <div className="courses__data" style={{ display: "flex" }}>
            {coursesData.map((course) => (
              <SwiperSlide>
                <Course course={course} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
        <h3 className="courses-title">가장 리뷰가 많은 강의</h3>
        <Swiper slidesPerView={4} slidesPerGroup={4} navigation pagination>
          <div className="courses__data">
            {coursesData.map((course) => (
              <SwiperSlide>
                <Course course={course} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </StyledCouresesView>
  );
};

export default CourseView;

const StyledCouresesView = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500;
  max-width: 1500px;
  margin: auto;

  .courses {
    &-title {
      margin: 30px 0 20px;
      text-align: center;
    }

    &__data {
      display: flex;
    }
  }

  .swiper-pagination {
    bottom: 0;
  }

  .swiper-pagination-bullet-active {
    background-color: #272c48;
    opacity: 0.9;
  }

  .swiper-container > .swiper-button-next,
  .swiper-container > .swiper-button-prev {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #3c3836;
    opacity: 0.8;

    &::after {
      content: "";
      border: 4px solid #fff;
    }

    &.swiper-button-next {
      right: 0;

      &::after {
        border-top: none;
        border-left: none;
        width: 10px;
        height: 10px;
        transform: translateX(-2px) rotate(-45deg);
      }
    }

    &.swiper-button-prev {
      left: 0;

      &::after {
        border-bottom: none;
        border-right: none;
        width: 10px;
        height: 10px;
        transform: translateX(2px) rotate(-45deg);
      }
    }

    &.swiper-button-disabled {
      pointer-events: auto;
    }

    &:hover {
      opacity: 1;
    }
  }
`;

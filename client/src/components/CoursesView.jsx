import React, { useEffect, useState } from "react";
import Course from "./Course";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Skeleton from "./Skeleton";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const CourseView = ({
  get_recent_add_courses,
  most_review_courses,
  recent_review_courses,
}) => {
  const sildesState = () => {
    if (window.innerWidth > 1500) return 1500 / 375;
    else if (window.innerWidth < 380) return 1;
    else return window.innerWidth / 375;
  };
  const [slidesPer, setSlidesPer] = useState(sildesState);

  const handleResize = () => {
    if (window.innerWidth > 1500) setSlidesPer(1500 / 375);
    else if (window.innerWidth < 380) setSlidesPer(1);
    else setSlidesPer(window.innerWidth / 375);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <StyledCouresesView className="courses-wrapper">
      <div className="courses">
        <h3 className="courses-title">최근에 추가된 강의</h3>
        {get_recent_add_courses.length === 0 && (
          <Skeleton loading={alert.loading} />
        )}
        <Swiper
          slidesPerView={Math.floor(slidesPer)}
          slidesPerGroup={Math.floor(slidesPer)}
          navigation
          pagination
        >
          <div className="courses__data" style={{ display: "flex" }}>
            {get_recent_add_courses.map((course) => (
              <SwiperSlide>
                <Course course={course} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
        <h3 className="courses-title">리뷰가 최근에 작성된 강의</h3>
        {most_review_courses.length === 0 && (
          <Skeleton loading={alert.loading} />
        )}
        <Swiper
          slidesPerView={Math.floor(slidesPer)}
          slidesPerGroup={Math.floor(slidesPer)}
          navigation
          pagination
        >
          <div className="courses__data" style={{ display: "flex" }}>
            {recent_review_courses.map((course) => (
              <SwiperSlide>
                <Course course={course} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
        <h3 className="courses-title">가장 리뷰가 많은 강의</h3>
        {recent_review_courses.length === 0 && (
          <Skeleton loading={alert.loading} />
        )}
        <Swiper
          slidesPerView={Math.floor(slidesPer)}
          slidesPerGroup={Math.floor(slidesPer)}
          navigation
          pagination
        >
          <div className="courses__data">
            {most_review_courses.map((course) => (
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
  min-width: 380px;

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

    @media (max-width: 1500px) {
      margin: 0 10px;
    }
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
  }
`;

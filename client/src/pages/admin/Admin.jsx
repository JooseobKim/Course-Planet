import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ScrapingButton from "../../components/ScrapingButton";
import ScrapingCondition from "../../components/ScrapingCondition";
import Course from "../../components/Course";
import Skeleton from "../../components/Skeleton";
import ScrapingDataCheckbox from "../../components/ScrapingDataCheckbox";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Admin = () => {
  const {
    alert,
    auth,
    course: { inflearn_courses, fastcampus_courses },
  } = useSelector((state) => state);
  const scrapingPlatform = {
    inflearn: "inflearn",
    fastcampus: "fastcampus",
  };

  const [scrapingCondition, setScrapingCondition] = useState({
    order: "recent",
    pageFrom: 1,
    pageTo: 1,
    category: "category_dev_online",
  });

  const [inflearnCheckState, setInflearnCheckState] = useState({});
  const [fastcampusCheckState, setFastcampusCheckState] = useState({});

  useEffect(() => {
    createCheckboxObj(inflearn_courses, fastcampus_courses);
  }, [inflearn_courses, fastcampus_courses]);

  const createCheckboxObj = (inflearn, fastcampus) => {
    const inflearncheckboxObj = {};
    const fastcampuscheckboxObj = {};

    for (let i = 0; i < inflearn.length; i++) {
      inflearncheckboxObj[`inflearnCheckbox${i}`] = false;
    }

    for (let i = 0; i < fastcampus.length; i++) {
      fastcampuscheckboxObj[`fastcampusCheckbox${i}`] = false;
    }

    setInflearnCheckState(inflearncheckboxObj);
    setFastcampusCheckState(fastcampuscheckboxObj);
  };

  return (
    <StyledAdmin>
      <div className="inflearn">
        <div className="inflearn__scraping">
          <div className="inflearn__scraping__control">
            <div className="inflearn__scraping__control__condition">
              <ScrapingCondition
                platform={scrapingPlatform.inflearn}
                condition={scrapingCondition}
                setCondition={setScrapingCondition}
              />
            </div>
            <div className="inflearn__scraping__control__button">
              <ScrapingButton
                platform={scrapingPlatform.inflearn}
                courses={inflearn_courses}
                condition={scrapingCondition}
                checkState={inflearnCheckState}
                setCheckState={setInflearnCheckState}
                auth={auth}
              />
            </div>
          </div>
          <div className="inflearn__scraping__courses">
            {inflearn_courses.length === 0 && (
              <Skeleton loading={alert.loading} admin={true} />
            )}
            <Swiper slidesPerView={4} slidesPerGroup={4} navigation pagination>
              {inflearn_courses.map((course, i) => (
                <SwiperSlide>
                  <ScrapingDataCheckbox
                    cbIndex={i}
                    checkState={inflearnCheckState}
                    setCheckState={setInflearnCheckState}
                    platform={scrapingPlatform.inflearn}
                  />
                  <Course course={course} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="fastcampus">
        <div className="fastcampus__scraping">
          <div className="fastcampus__scraping__control">
            <div className="fastcampus__scraping__control__condition">
              <ScrapingCondition
                platform={scrapingPlatform.fastcampus}
                condition={scrapingCondition}
                setCondition={setScrapingCondition}
              />
            </div>
            <div className="fastcampus__scraping__control__button">
              <ScrapingButton
                platform={scrapingPlatform.fastcampus}
                courses={fastcampus_courses}
                condition={scrapingCondition}
                checkState={fastcampusCheckState}
                setCheckState={setFastcampusCheckState}
                auth={auth}
              />
            </div>
          </div>
          <div className="fastcampus__scraping__courses">
            {fastcampus_courses.length === 0 && (
              <Skeleton loading={alert.loading} admin={true} />
            )}
            <Swiper slidesPerView={4} slidesPerGroup={4} navigation pagination>
              {fastcampus_courses.map((course, i) => (
                <SwiperSlide>
                  <ScrapingDataCheckbox
                    cbIndex={i}
                    checkState={fastcampusCheckState}
                    setCheckState={setFastcampusCheckState}
                    platform={scrapingPlatform.fastcampus}
                  />
                  <Course course={course} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </StyledAdmin>
  );
};

export default Admin;

const StyledAdmin = styled.div`
  max-width: 1500px;
  margin: auto;

  .inflearn,
  .fastcampus {
    margin: 10px 0;

    &__scraping {
      &__control {
      }
      &__courses {
        justify-content: center;
        margin: 15px 0;

        .swiper-pagination {
          bottom: 0;
        }
      }
    }
  }
`;

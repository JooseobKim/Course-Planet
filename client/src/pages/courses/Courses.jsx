import React, { useState } from "react";
import styled from "styled-components";
import Course from "../../components/Course";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// dummyData [courses]
import coursesData from "../../_dummyData/courses.json";

const Courses = () => {
  const [checkedState, setCheckedState] = useState({
    inflearn: false,
    fastcampus: false,
  });
  // console.log(checked);

  const handleOnChange = (e) => {
    const { name, checked } = e.target;
    console.log({ name, checked });

    setCheckedState({ ...checkedState, [name]: checked });
  };

  return (
    <StyledCourses>
      <div className="wrapper">
        <div className="courses__navbar">
          <label htmlFor="courses__navbar__select"></label>
          <FormControlLabel
            control={
              <Checkbox
                name="inflearn"
                checked={checkedState.inflearn}
                onChange={handleOnChange}
              />
            }
            label="인프런"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="fastcampus"
                checked={checkedState.fastcampus}
                onChange={handleOnChange}
              />
            }
            label="패스트캠퍼스"
          />
        </div>
        <div className="courses__list">
          {coursesData.map((course) => (
            <Course course={course} />
          ))}
          {coursesData.map((course) => (
            <Course course={course} />
          ))}
        </div>
      </div>
    </StyledCourses>
  );
};

export default Courses;

const StyledCourses = styled.div`
  max-width: 1500px;
  margin: auto;

  .wrapper {
    display: flex;
  }

  .courses__navbar {
    position: sticky;
    top: 71px;
    width: 175px;
    height: 100%;
    padding: 5px 10px;
    background-color: #eee;
  }

  .courses__list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    flex-wrap: wrap;
  }
`;

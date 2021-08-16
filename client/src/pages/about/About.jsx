import React from "react";
import styled from "styled-components";

const About = () => {
  return <StyledAbout>소개 페이지</StyledAbout>;
};

export default About;

const StyledAbout = styled.div`
  min-height: calc(100vh - 202px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

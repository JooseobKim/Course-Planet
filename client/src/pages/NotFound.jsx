import React from "react";
import styled from "styled-components";

const NotFound = () => {
  return <StyledNotFound>존재하지 않는 페이지입니다.</StyledNotFound>;
};

export default NotFound;

const StyledNotFound = styled.div`
  min-height: calc(100vh - 202px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

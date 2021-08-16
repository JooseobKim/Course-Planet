import React from "react";
import styled from "styled-components";

const ResignedUser = () => {
  return <StyledResignedUser>탈퇴 유저입니다.</StyledResignedUser>;
};

export default ResignedUser;

const StyledResignedUser = styled.div`
  min-height: calc(100vh - 202px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

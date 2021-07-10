import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { activateEmail } from "../../redux/actions/authAction";

const ActivateEmail = () => {
  const { activation_token } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (activation_token) {
      dispatch(activateEmail({ activation_token }));
      localStorage.setItem("LoggedIn", true);

      setTimeout(() => {
        window.location.replace("/");
      }, 3000);
    }
  }, [activation_token, dispatch]);

  return (
    <StyledActivateEmail>
      <span>이메일 인증 완료</span>
      <span>유저 등록에 성공하였습니다.</span>
    </StyledActivateEmail>
  );
};

export default ActivateEmail;

const StyledActivateEmail = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500;
  font-size: 22px;
  min-height: calc(100vh - 202px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    margin: 5px 0;
  }
`;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { sendMailResetPassword } from "../../redux/actions/authAction";

const SendMailResetPassword = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({ email: "" });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMailResetPassword({ email: data.email }));
  };

  return (
    <StyledSendMailResetPassword>
      <form onSubmit={handleOnSubmit} className="fg-pw">
        <label htmlFor="email" className="fg-pw__label">
          이메일을 입력해주세요.
        </label>
        <input
          type="email"
          className="fg-pw__email"
          id="email"
          name="email"
          placeholder="이메일을 입력해주세요."
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <button
          type="submit"
          className="fg-pw__btn"
          disabled={data.email ? false : true}
        >
          인증 메일 전송
        </button>
      </form>
    </StyledSendMailResetPassword>
  );
};

export default SendMailResetPassword;

const StyledSendMailResetPassword = styled.div`
  font-weight: 300;
  max-width: 1500px;
  min-height: calc(100vh - 202px);
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  .fg-pw {
    background-color: #fff;
    width: 400px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;

    &__label {
      font-size: 17px;
    }

    &__email {
      background-color: #ecebf6;
      width: 250px;
      padding: 7px 10px;
      margin: 25px 0 20px;
      border: none;
      border-bottom: 2px solid #8a8ba1;
      border-radius: 3px;
      outline: none;
      opacity: 0.7;

      &:hover,
      &:focus {
        opacity: 1;
      }
    }

    &__btn {
      font-family: "Noto Sans KR", sans-serif;
      font-weight: 300;
      padding: 7px 15px;
      border: none;
      border-radius: 3px;
      outline: none;
      background-color: #272c48;
      color: #fff;
      opacity: 0.7;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }

      &:disabled {
        background-color: #999;
        cursor: not-allowed;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
`;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { resetPassword } from "../../redux/actions/authAction";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const [data, setData] = useState({ password: "", cf_password: "" });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(
      resetPassword({
        password: data.password,
        cf_password: data.cf_password,
        token,
      })
    );
  };

  return (
    <StyledResetPassword>
      <form onSubmit={handleOnSubmit} className="reset-pw">
        <label htmlFor="password" className="reset-pw__label">
          패스워드를 입력해주세요.
        </label>
        <input
          type="password"
          className="reset-pw__password"
          id="password"
          name="password"
          placeholder="패스워드를 입력해주세요."
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          minLength={6}
        />
        <label htmlFor="cf-password" className="reset-pw__label">
          다시 한 번 패스워드를 입력해주세요.
        </label>
        <input
          type="password"
          className="reset-pw__cf-password"
          id="cf-password"
          name="cf-password"
          placeholder="다시 한 번 패스워드를 입력해주세요."
          value={data.cf_password}
          onChange={(e) => setData({ ...data, cf_password: e.target.value })}
          minLength={6}
        />
        <button
          type="submit"
          className="reset-pw__btn"
          disabled={data.password && data.cf_password ? false : true}
        >
          비밀번호 변경
        </button>
        {!auth.token && (
          <Link to="/login" className="reset-pw__link">
            로그인 페이지로 이동
          </Link>
        )}
      </form>
    </StyledResetPassword>
  );
};

export default ResetPassword;

const StyledResetPassword = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 300;
  max-width: 1500px;
  min-height: calc(100vh - 202px);
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  .reset-pw {
    background-color: #fff;
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;

    &__label {
      font-size: 17px;
    }

    &__password,
    &__cf-password {
      background-color: #ecebf6;
      width: 250px;
      padding: 7px 10px;
      margin: 20px 0 25px;
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

    &__link {
      margin-top: 15px;
      text-decoration: none;
      color: #272c48;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

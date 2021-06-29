import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <StyledLogin>
      <div className="wrapper">
        <div className="login">
          <span className="login__title">로그인하기</span>
          <form className="login__form">
            <label htmlFor="login__form__input-id">아이디</label>
            <input
              type="text"
              id="login__form__input-id"
              className="login__form__input-id"
              placeholder="아이디를 입력해주세요."
            />
            <label htmlFor="login__form__input-pw">패스워드</label>
            <input
              type="password"
              id="login__form__input-pw"
              className="login__form__input-pw"
              placeholder="패스워드를 입력해주세요."
            />
            <button type="submit" className="login__form__submit">
              로그인
            </button>
          </form>
          <div className="login__link">
            <Link to="/forgot_pw">
              <span className="login__link__forgot-password">
                비밀번호를 잊으셨나요?
              </span>
            </Link>
            <Link to="/register">
              <span className="login__link__regitser">계정이 없으신가요?</span>
            </Link>
          </div>
        </div>
      </div>
    </StyledLogin>
  );
};

export default Login;

const StyledLogin = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 300;
  color: #272c48;
  font-size: 17px;
  height: calc(100vh - 201px);

  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login {
    width: 500px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    &__title {
      font-size: 20px;
      margin-bottom: 20px;
    }

    &__form {
      display: flex;
      flex-direction: column;
      width: 300px;

      &__input-id,
      &__input-pw {
        margin: 10px 0;
        padding: 0 7px;
        height: 35px;
        outline: none;
        border-radius: 3px;
        border: none;
        background-color: #ecebf6;
        border-bottom: 2px solid #8a8ba1;
        opacity: 0.7;

        &:hover,
        &:focus {
          opacity: 1;
        }
      }

      &__submit {
        height: 35px;
        margin: 5px 0 15px;
        border: none;
        padding: 5px 0;
        background-color: #272c48;
        color: #fff;
        border-radius: 5px;
        opacity: 0.7;
        cursor: pointer;

        &:hover {
          opacity: 1;
        }
      }
    }

    &__link {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 350px;

      a {
        text-decoration: none;
        color: #272c48;
      }
    }
  }
`;

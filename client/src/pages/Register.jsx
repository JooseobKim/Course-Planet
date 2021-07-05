import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/authAction";

const Register = () => {
  const initialState = {
    username: "",
    userId: "",
    email: "",
    password: "",
    cf_password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { username, userId, email, password, cf_password } = userData;
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleOnChange = (e) => {
    let { name, value } = e.target;

    if (name === "username")
      return setUserData({
        ...userData,
        [name]: value.toLowerCase().replace(/ /g, ""),
      });

    if (name === "userId")
      return setUserData({
        ...userData,
        [name]: value.replace(/ /g, ""),
      });

    setUserData({ ...userData, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ username, userId, email, password, cf_password }));
  };

  return (
    <StyledRgister>
      <div className="wrapper">
        <div className="register">
          <span className="register__title">계정 등록하기</span>
          <form className="register__form" onSubmit={handleOnSubmit}>
            <label htmlFor="register__form__input-username">유저이름 *</label>
            <input
              type="text"
              id="register__form__input-username"
              className="register__form__input-username"
              placeholder="유저이름을 입력해주세요."
              name="username"
              value={username}
              onChange={handleOnChange}
              maxLength={25}
            />
            <label htmlFor="register__form__input-id">아이디 *</label>
            <input
              type="text"
              id="register__form__input-id"
              className="register__form__input-id"
              placeholder="아이디를 입력해주세요."
              name="userId"
              value={userId}
              onChange={handleOnChange}
            />
            <label htmlFor="register__form__input-email">이메일 *</label>
            <input
              type="email"
              id="register__form__input-email"
              className="register__form__input-email"
              placeholder="이메일을 입력해주세요."
              name="email"
              value={email}
              onChange={handleOnChange}
            />
            <label htmlFor="register__form__input-pw">패스워드 *</label>
            <input
              type="password"
              id="register__form__input-pw"
              className="register__form__input-pw"
              placeholder="패스워드를 입력해주세요."
              name="password"
              value={password}
              onChange={handleOnChange}
            />
            <label htmlFor="register__form__input-confirm-pw">
              패스워드 확인 *
            </label>
            <input
              type="password"
              id="register__form__input-confirm-pw"
              className="register__form__input-confirm-pw"
              placeholder="패스워드를 다시 한 번 입력해주세요."
              name="cf_password"
              value={cf_password}
              onChange={handleOnChange}
            />
            <button
              type="submit"
              className="register__form__submit"
              disabled={
                !username || !userId || !email || !password || !cf_password
              }
            >
              회원가입
            </button>
          </form>
          <div className="register__link">
            <Link to="/forgot_pw">
              <span className="register__link__forgot-password">
                비밀번호를 잊으셨나요?
              </span>
            </Link>
            <Link to="/login">
              <span className="register__link__regitser">
                계정이 있으신가요?
              </span>
            </Link>
          </div>
        </div>
      </div>
    </StyledRgister>
  );
};

export default Register;

const StyledRgister = styled.div`
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

  .register {
    width: 500px;
    height: 600px;
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

      &__input-username,
      &__input-id,
      &__input-email,
      &__input-pw,
      &__input-confirm-pw {
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

        &:disabled {
          cursor: not-allowed;
          opacity: 0.7;
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { facebookLogin, googleLogin, login } from "../redux/actions/authAction";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

const Login = () => {
  const initialState = { userId: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { userId, password } = userData;
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChnageInput = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  const hadnleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ userId, password }));
  };

  const responseGoogle = (response) => {
    dispatch(googleLogin({ userInfo: response.profileObj }));
  };

  const responseFacebook = (response) => {
    dispatch(facebookLogin({ response }));
  };

  return (
    <StyledLogin>
      <div className="wrapper">
        <div className="login">
          <span className="login__title">로그인하기</span>
          <form className="login__form" onSubmit={hadnleSubmit}>
            <label htmlFor="login__form__input-id">아이디</label>
            <input
              type="text"
              id="login__form__input-id"
              className="login__form__input-id"
              placeholder="아이디를 입력해주세요."
              name="userId"
              value={userId}
              onChange={handleChnageInput}
            />
            <label htmlFor="login__form__input-pw">패스워드</label>
            <input
              type="password"
              id="login__form__input-pw"
              className="login__form__input-pw"
              placeholder="패스워드를 입력해주세요."
              name="password"
              value={password}
              onChange={handleChnageInput}
            />
            <button
              type="submit"
              className="login__form__submit"
              disabled={!userId || !password}
            >
              로그인
            </button>
          </form>
          <div className="login__hr">
            <span>or</span>
          </div>
          <div className="login__social-login">
            <StyledGoogleLoginBtn
              clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
              buttonText="구글 계정으로 로그인"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_LOGIN_APP_ID}
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              textButton="페이스북 계정으로 로그인"
              size="medium"
            />
          </div>
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
  min-height: calc(100vh - 202px);
  display: flex;
  justify-content: center;
  align-items: center;

  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
  }

  .login {
    width: 500px;
    height: 550px;
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

        &:disabled {
          background-color: #999;
          cursor: not-allowed;

          &:hover {
            opacity: 0.7;
          }
        }
      }
    }

    &__hr {
      position: relative;
      width: 100%;
      color: #999;
      text-align: center;
      margin: 10px 0;

      span {
        text-align: center;
      }

      &::before {
        content: "";
        position: absolute;
        left: 25px;
        top: 0;
        bottom: 0;
        margin: auto 0;
        width: 39%;
        height: 0;
        border-top: 1px solid #999;
      }

      &::after {
        content: "";
        position: absolute;
        right: 25px;
        top: 0;
        bottom: 0;
        margin: auto 0;
        width: 39%;
        height: 0;
        border-top: 1px solid #999;
      }
    }

    &__social-login {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 5px 0 20px;
    }

    &__link {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 350px;

      a {
        text-decoration: none;
        color: #272c48;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  @media (max-width: 768px) {
    min-width: 380px;
    .wrapper {
      .login {
        &__hr {
          &::after {
          }
        }
      }
    }
  }

  @media (max-width: 450px) {
    .wrapper {
      .login {
        box-shadow: none;
      }
    }
  }
`;

const StyledGoogleLoginBtn = styled(GoogleLogin)`
  font-size: calc(0.27548vw + 12.71074px) !important;
  padding: calc(0.34435vw + -2px) calc(0.34435vw + 1px) !important;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

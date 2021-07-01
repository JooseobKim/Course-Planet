import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authAction";

const Header = () => {
  const { auth } = useSelector((state) => state);
  const searchInputRef = useRef();
  const location = useLocation();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState(null);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const handleOnChnage = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <StyledHeader>
      <div className="header">
        <div
          className="header__logo"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <Link to="/" className="logo__link">
            CoursePlanet
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="nav__list">
            <Link to="/courses">
              <li
                className={`nav__item ${
                  location.pathname === "/courses" && "active"
                }`}
              >
                강의
              </li>
            </Link>
            <Link to="/community">
              <li
                className={`nav__item ${
                  location.pathname === "/community" && "active"
                }`}
              >
                커뮤니티
              </li>
            </Link>
            <Link to="/about">
              <li
                className={`nav__item ${
                  location.pathname === "/about" && "active"
                }`}
              >
                소개
              </li>
            </Link>
          </ul>
        </nav>
        <div className="header__search-login">
          <form className="search">
            <label htmlFor="search-input" className="search-input__label">
              {searchValue ? <ClearIcon /> : <SearchIcon />}
              <span className="blind">Search</span>
            </label>
            <input
              type="text"
              id="search-input"
              className="search__input"
              name="searchValue"
              value={searchValue}
              onChange={handleOnChnage}
              placeholder="검색어를 입력하세요."
              ref={searchInputRef}
            />
            <button type="submit" className="search__button blind">
              검색
            </button>
          </form>
          {auth.token ? (
            <img
              src={auth.user && auth.user.avatar}
              alt={`${auth.user.username} avatar`}
              className="header__user-avatar"
              onClick={() => setProfileDropdown(!profileDropdown)}
            />
          ) : (
            <>
              <Link to="/login" className="login__link">
                <Button variant="contained">로그인</Button>
              </Link>
              <Link to="/register" className="register__link">
                <Button variant="contained">회원가입</Button>
              </Link>
            </>
          )}
          {auth.token && profileDropdown && (
            <div className="header__dropdown">
              <div className="header__dropdown__item">내 프로필</div>
              <div className="header__dropdown__item">내 활동</div>
              <div
                className="header__dropdown__item"
                onClick={() => dispatch(logout())}
              >
                로그아웃
              </div>
            </div>
          )}
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 300;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 0 15px;
  border-bottom: 1px solid #ecebf6;
  background-color: #fff;
  z-index: 9;

  .blind {
    display: none;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1500px;
    margin: auto;
    height: 70px;

    &__logo {
      .logo__link {
        color: #272c48;
        text-decoration: none;
      }
    }

    &__nav {
      position: absolute;
      width: 218px;
      left: 0;
      right: 0;
      margin: auto;

      .nav__list {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        a {
          text-decoration: none;
        }

        .nav__item {
          padding: 12px 15px;
          color: #8a8ba1;

          &.active {
            background-color: #ecebf6;
            color: #272c48;
            border-radius: 10px;
          }

          &:hover {
            background-color: #ecebf6;
            color: #272c48;
            border-radius: 10px;
          }
        }
      }
    }

    &__search-login {
      position: relative;
      display: flex;

      .search {
        position: relative;
        display: flex;
        align-items: center;
        margin-right: 20px;

        .search-input__label {
          .MuiSvgIcon-root {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 5px;
            margin: auto;
            font-size: 20px;
            cursor: pointer;
          }
        }

        .search__input {
          padding: 9px 28px 9px 7px;
          border: 0;
          background-color: #ecebf6;
          border-radius: 5px;
          outline: none;
        }
      }

      .login__link,
      .register__link {
        text-decoration: none;

        .MuiButton-contained {
          opacity: 0.8;

          &:hover {
            opacity: 1;
          }
        }
      }

      .login__link {
        .MuiButton-contained {
          background-color: #fff;
          box-shadow: none;
        }
      }

      .register__link {
        .MuiButton-contained {
          color: #fff;
          background-color: #272c48;
          border-radius: 10px;
          box-shadow: none;
        }
      }
    }

    &__user-avatar {
      width: 35px;
      height: 35px;
      cursor: pointer;
    }

    &__dropdown {
      position: absolute;
      right: 0;
      border-radius: 5px;
      transform: translateY(40px);
      color: #ecebf6;
      background-color: #8a8ba1;
      overflow: hidden;

      &__item {
        line-height: 1.7;
        cursor: pointer;

        &:first-child,
        &:nth-child(2) {
          border-bottom: 0.5px solid #ecebf6;
        }

        &:first-child,
        &:nth-child(2),
        &:last-child {
          padding: 7px 10px;

          &:hover {
            background-color: #272c48;
          }
        }
      }
    }
  }
`;

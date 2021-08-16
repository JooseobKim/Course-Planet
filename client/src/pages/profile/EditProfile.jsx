import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { ALERT_TYPES } from "../../redux/actions/alertAction";
import { sendMailResetPassword } from "../../redux/actions/authAction";
import { deleteUser, updateProfile } from "../../redux/actions/userAction";

const EditProfile = () => {
  const { auth } = useSelector((state) => state);
  const { username } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const fileInput = useRef();

  const initialState = {
    username: auth.user.username,
    email: auth.user.email,
    address: auth.user.address,
    mobile: auth.user.mobile,
  };
  const [updateUserData, setUpdateUserData] = useState(initialState);
  const [profileAvatar, setProfileAvatar] = useState("");

  useEffect(() => {
    if (auth.user.username !== username)
      history.push(`/profile/${auth.user.username}/edit`);
  }, [history, username, auth.user.username]);

  const handleChangeInput = (e) => {
    let { name, value } = e.target;

    if (name === "mobile") {
      value = value.replace(/[^0-9]/gi, "");

      if (value.length > 11) return;
    }

    if (name === "username") {
      value = value.toLowerCase().replace(/ /g, "");

      if (value.length > 25) return;
    }

    setUpdateUserData({ ...updateUserData, [name]: value });
  };

  const handleDeleteUser = () => {
    const confirm = window.confirm(
      "유저를 삭제하면 복구가 불가능합니다. 계속 진행하시겠습니까?"
    );

    if (confirm) {
      dispatch(deleteUser({ username, auth }));
      alert("유저가 삭제되었습니다.");
      window.location.replace("/");
    }
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];

    if (!file)
      return dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { errMsg: "파일이 존재하지 않습니다." },
      });

    if (file.size > 1024 * 1024 * 10)
      // 10mb
      return dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { errMsg: "파일의 용량은 10MB 이하만 업로드가 가능합니다." },
      });

    if (file.type !== "image/jpeg" && file.type !== "image/png")
      return dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { errMsg: "사진 파일만 업로드가 가능합니다." },
      });

    setProfileAvatar(file);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    let notChanged = true;

    for (const [key, value] of Object.entries(updateUserData)) {
      if (initialState[key] !== value) {
        notChanged = false;
        break;
      }
    }

    if (notChanged && !profileAvatar) return;

    dispatch(updateProfile({ updateUserData, profileAvatar, auth }));

    setProfileAvatar("");
  };

  const resetInput = () => {
    fileInput.current.value = "";
  };

  const settingDefaultImage = () => {
    setProfileAvatar(
      "https://res.cloudinary.com/duw5jvlb4/image/upload/v1624169200/samples/avatar_default6_ctvu5b.png"
    );
    resetInput();
  };

  const settingMyPrevImage = () => {
    setProfileAvatar(auth.user.avatar);
    resetInput();
  };

  const urlRegex = (url) => {
    const re =
      // eslint-disable-next-line
      /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return re.test(url);
  };

  return (
    <StyledEditProfile>
      <form onSubmit={handleOnSubmit}>
        <button
          type="button"
          className="delete_user"
          onClick={handleDeleteUser}
        >
          유저 삭제
        </button>
        <div className="profile-title">프로필 설정</div>
        <div className="profile-avatar">
          <img
            src={
              profileAvatar
                ? urlRegex(profileAvatar)
                  ? profileAvatar
                  : URL.createObjectURL(profileAvatar)
                : auth.user.avatar
            }
            alt={`${username} profile avatar`}
          />
          <div className="profile-avatar__upload">
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={changeAvatar}
              ref={fileInput}
            />
          </div>
        </div>
        <div className="profile-avatar__setting">
          <button type="button" onClick={settingDefaultImage}>
            기본 이미지 설정
          </button>
          <button type="button" onClick={settingMyPrevImage}>
            나의 기존 이미지 설정
          </button>
        </div>
        <div className="profile-container">
          <div className="profile-container__item">
            <label htmlFor="username">* 유저 이름</label>
            <input
              className="profile-container__item__input"
              type="text"
              placeholder="유저 이름을 입력해주세요."
              id="username"
              name="username"
              value={updateUserData.username}
              onChange={handleChangeInput}
              maxLength={25}
            />
          </div>
          <div className="profile-container__item">
            <label htmlFor="mobile">전화번호</label>
            <input
              className="profile-container__item__input"
              type="text"
              placeholder="전화번호를 입력해주세요."
              id="mobile"
              name="mobile"
              value={updateUserData.mobile}
              onChange={handleChangeInput}
              maxLength={11}
            />
          </div>
          <div className="profile-container__item">
            <label htmlFor="address">주소</label>
            <input
              className="profile-container__item__input"
              type="text"
              placeholder="주소를 입력해주세요."
              id="address"
              name="address"
              value={updateUserData.address}
              onChange={handleChangeInput}
            />
          </div>
          <div className="profile-container__item">
            <label htmlFor="email">이메일 ( 비밀번호 변경 인증 이메일 )</label>
            <input
              className="profile-container__item__input"
              type="email"
              name="email"
              value={updateUserData.email}
              readOnly
              disabled
            />
          </div>
          <div className="profile-container__item">
            <span>비밀번호 변경하기</span>
            <button
              type="button"
              name="reset-pw"
              className="profile-container__item__reset-pw"
              onClick={() => {
                if (
                  window.confirm("비밀번호 변경 인증 메일을 발송하시겠습니까?")
                )
                  dispatch(
                    sendMailResetPassword({ email: updateUserData.email })
                  );
              }}
            >
              비밀번호 변경
              <br />
              인증 메일 발송
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={
            !updateUserData.username || auth.user.username !== username
              ? true
              : false
          }
        >
          업데이트
        </button>
      </form>
    </StyledEditProfile>
  );
};

export default EditProfile;

const StyledEditProfile = styled.div`
  font-weight: 300;
  min-height: calc(100vh - 202px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    margin: 20px 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .delete_user {
      position: absolute;
      top: 0;
      left: 0;
      height: 30px;
      padding: 0 10px;
      background-color: #cc0000;
      color: #fff;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    }

    .profile-title {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 2px;
    }

    .profile-avatar {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      margin: 20px 0 10px;

      img {
        width: 150px;
        height: 150px;
        margin: 5px 0;
        object-fit: cover;
        border-radius: 50%;
      }

      input[type="file"] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        opacity: 0;

        &::-webkit-file-upload-button {
          cursor: pointer;
        }
      }
    }

    .profile-avatar__setting {
      display: flex;
      width: 100%;

      button {
        height: 35px;
        margin: 0 5px;
        border: none;
        outline: none;
        cursor: pointer;
        background-color: #ecebf6;
        border-radius: 5px;
        opacity: 0.8;
        font-weight: 700;
        flex: 1;
        min-width: 250px;

        &:hover {
          opacity: 1;
        }
      }
    }

    .profile-container {
      display: grid;
      grid-template-columns: repeat(4, minmax(125px, 175px));
      justify-content: center;
      align-items: center;
      grid-gap: 15px;
      margin: 15px 0;

      &__item {
        display: flex;
        flex-direction: column;
        height: 75px;

        label,
        span {
          margin-bottom: 10px;
          font-size: 15px;
        }

        &__input {
          height: 100%;
          padding: 0 10px;
          outline: none;
          border: 1px solid #ecebf6;
          border-radius: 3px;

          &:focus {
            background-color: #ecebf6;
          }
        }

        &__reset-pw {
          font-family: "Noto Sans KR", sans-serif;
          font-weight: 300;
          background-color: #999;
          color: #fff;
          border: none;
          outline: none;
          width: 100%;
          height: 100%;
          border-radius: 3px;
          opacity: 0.7;
          cursor: pointer;

          &:hover {
            opacity: 1;
          }
        }

        &:nth-child(1) {
          grid-column: 1 / 3;
        }
        &:nth-child(2) {
          grid-column: 3 / 5;
        }
        &:nth-child(3) {
          grid-column: 1 / 5;
        }
        &:nth-child(4) {
          grid-column: 1 / 4;
        }
        &:nth-child(5) {
          grid-column: 4 / 5;
        }
      }
    }

    button[type="submit"] {
      border: none;
      outline: none;
      min-width: 250px;
      width: 100%;
      height: 35px;
      border-radius: 5px;
      background-color: #272c48;
      color: #fff;
      opacity: 0.8;
      cursor: pointer;

      &:disabled {
        background-color: #999;
        cursor: not-allowed;

        &:hover {
          opacity: 0.8;
        }
      }

      &:hover {
        opacity: 1;
      }
    }
  }

  @media (max-width: 768px) {
    min-width: 380px;

    form {
      width: 90%;

      .profile-avatar__setting {
        flex-direction: column;

        button[type="button"] {
          padding: 10px;

          &:first-child {
            margin-bottom: 5px;
          }
        }
      }

      .profile-container {
        width: 100%;
        display: flex;
        flex-direction: column;

        &__item {
          width: 100%;
        }
      }
    }
  }
`;

import axios from "axios";
import { ALERT_TYPES } from "./alertAction";
import { AUTH_TYPES } from "./authAction";
import { REVIEW_TYPES } from "./reviewAction";

export const USER_TYPES = {};

export const updateProfile =
  ({ updateUserData, profileAvatar, auth }) =>
  async (dispatch) => {
    if (!updateUserData.username)
      return dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { errMsg: "필수 항목을 입력해주세요." },
      });

    if (updateUserData.username.length > 20)
      return dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { errMsg: "유저 이름은 20 글자 이하로 입력해주세요." },
      });

    try {
      dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

      let media;

      if (profileAvatar) {
        const formData = new FormData();

        formData.append("file", profileAvatar);
        formData.append("upload_preset", "u9rr2gys");
        formData.append("cloud_name", "duw5jvlb4");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/duw5jvlb4/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        media = { public_id: data.public_id, url: data.secure_url };
      }

      // let pw_res;

      // if (updateUserData.password && updateUserData.cf_password) {
      //   const { password, cf_password } = updateUserData;

      //   if (password.length < 6)
      //     return dispatch({
      //       type: ALERT_TYPES.ALERT,
      //       payload: {
      //         errMsg: "비밀번호는 최소 6 글자 이상이어야 합니다.",
      //       },
      //     });

      //   if (password !== cf_password)
      //     return dispatch({
      //       type: ALERT_TYPES.ALERT,
      //       payload: {
      //         errMsg: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
      //       },
      //     });

      //   pw_res = await axios.post(
      //     "/user/reset_password",
      //     { password, cf_password },
      //     {
      //       headers: { Authorization: auth.token },
      //     }
      //   );
      // }

      const res = await axios.patch(
        `/user/${auth.user.username}`,
        {
          ...updateUserData,
          avatar: profileAvatar ? media.url : auth.user.avatar,
          auth,
        },
        {
          headers: { Authorization: auth.token },
        }
      );

      dispatch({
        type: AUTH_TYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...updateUserData,
            avatar: profileAvatar ? media.url : auth.user.avatar,
          },
        },
      });

      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: {
          successMsg: res.data.msg,
          loading: false,
        },
      });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: {
          errMsg: err.response?.data.msg || err.message,
          loading: false,
        },
      });
    }
  };

export const deleteUser =
  ({ username, auth }) =>
  async (dispatch) => {
    if (username === auth.user.username) {
      try {
        dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

        localStorage.removeItem("LoggedIn");

        const res = await axios.delete(`/user/${username}`, {
          headers: { Authorization: auth.token },
        });

        dispatch({
          type: ALERT_TYPES.ALERT,
          payload: { successMsg: res.data.msg, loading: false },
        });
      } catch (err) {
        dispatch({
          type: ALERT_TYPES.ALERT,
          payload: {
            errMsg: err.response?.data.msg || err.message,
            loading: false,
          },
        });
      }
    }
  };

export const contactMeSendMail =
  ({ fullname, email, message }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

      const res = await axios.post("/user/contact_send_mail", {
        fullname,
        email,
        message,
      });

      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { successMsg: res.data.msg, loading: false },
      });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: {
          errMsg: err.response?.data.msg || err.message,
          loading: false,
        },
      });
    }
  };

export const getReviewsByUsername =
  ({ username }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT_TYPES.ALERT });

      const res = await axios.get(`/user/${username}/review`);

      if (res.data.reviews)
        dispatch({
          type: REVIEW_TYPES.GET_USER_REVIEWS,
          payload: res.data.reviews,
        });

      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { msg: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: {
          errMsg: err.response?.data.msg || err.message,
          loading: false,
        },
      });
    }
  };

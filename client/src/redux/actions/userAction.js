import axios from "axios";
import { ALERT_TYPES } from "./alertAction";
import { AUTH_TYPES } from "./authAction";

export const USER_TYPES = {};

export const updateProfile =
  ({ updateUserData, profileAvatar, auth }) =>
  async (dispatch) => {
    if (!updateUserData.username)
      return dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { msg: "필수 항목을 입력해주세요." },
      });

    if (updateUserData.username.length > 20)
      return dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { msg: "유저 이름은 20 글자 이하로 입력해주세요." },
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

      let pw_res;

      if (updateUserData.password && updateUserData.cf_password) {
        const { password, cf_password } = updateUserData;

        if (password.length < 6)
          return dispatch({
            type: ALERT_TYPES.ALERT,
            payload: {
              msg: "비밀번호는 최소 6 글자 이상이어야 합니다.",
            },
          });

        console.log({ password, cf_password });

        if (password !== cf_password)
          return dispatch({
            type: ALERT_TYPES.ALERT,
            payload: {
              msg: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
            },
          });

        pw_res = await axios.post(
          `/user/${auth.user.username}`,
          { password, cf_password },
          {
            headers: { Authorization: auth.token },
          }
        );
      }

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
          msg: `${res.data.msg} ${(pw_res && pw_res.data.msg) || ""}`,
          loading: false,
        },
      });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { msg: err.message, loading: false },
      });
    }
  };

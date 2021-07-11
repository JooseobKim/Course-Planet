import axios from "axios";
import { ALERT_TYPES } from "./alertAction";

export const AUTH_TYPES = {
  AUTH: "AUTH",
};

export const register =
  ({ username, userId, email, password, cf_password }) =>
  async (dispatch) => {
    const validateEmail = (email) => {
      const re =
        // eslint-disable-next-line
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };

    const validData = [
      {
        condition: username.length > 20,
        msg: "닉네임을 20 글자 이하로 입력해주세요.",
      },
      {
        condition: userId.length > 20,
        msg: "아이디를 20 글자 이하로 입력해주세요.",
      },
      {
        condition: !validateEmail(email),
        msg: "올바른 이메일 양식을 입력해주세요.",
      },
      {
        condition: password.length < 6,
        msg: "비밀번호는 최소 6 글자 이상이어야 합니다.",
      },
      {
        condition: password !== cf_password,
        msg: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
      },
    ];

    const valid = (condition, msg) => {
      if (condition)
        return dispatch({
          type: ALERT_TYPES.ALERT,
          payload: { msg },
        });
    };

    validData.map((item) => valid(item.condition, item.msg));

    try {
      dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

      const res = await axios.post("/auth/register", {
        username,
        userId,
        email,
        password,
        cf_password,
      });

      dispatch({
        type: AUTH_TYPES.AUTH,
        payload: { token: res.data.accessToken, user: res.data.user },
      });

      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { msg: res.data.msg, loading: false },
      });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { loading: false, msg: err.response.data.msg },
      });
    }
  };

export const login =
  ({ userId, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

      const res = await axios.post("/auth/login", { userId, password });

      dispatch({
        type: AUTH_TYPES.AUTH,
        payload: { token: res.data.accessToken, user: res.data.user },
      });

      localStorage.setItem("LoggedIn", true);

      dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { loading: false, error: err.response.data.msg },
      });
    }
  };

export const refreshToken = () => async (dispatch) => {
  const LoggedIn = localStorage.getItem("LoggedIn");
  if (LoggedIn) {
    dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

    try {
      const res = await axios.post("/auth/refresh_token");

      dispatch({
        type: AUTH_TYPES.AUTH,
        payload: {
          token: res.data.accessToken,
          user: res.data.user,
        },
      });

      dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: {
          loading: false,
          error: err.message,
        },
      });
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("LoggedIn");

    const res = await axios.post("/auth/logout");

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);

    dispatch({
      type: ALERT_TYPES.ALERT,
      payload: {
        msg: res.data.msg,
      },
    });
  } catch (err) {
    dispatch({
      type: ALERT_TYPES.ALERT,
      payload: {
        error: err.message,
      },
    });
  }
};

export const activateEmail =
  ({ activation_token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

      const res = await axios.post("/auth/activate_email", {
        activationToken: activation_token,
      });

      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { loading: false, msg: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { loading: false, msg: err.message },
      });
    }
  };

export const sendMailResetPassword =
  ({ email }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

      const res = await axios.post("/auth/send_mail_reset_pw", { email });

      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { loading: false, msg: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { msg: err.response?.data.msg || err.message, loading: false },
      });
    }
  };

export const resetPassword =
  ({ password, cf_password, token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

      const res = await axios.post(
        "/user/reset_password",
        { password, cf_password },
        {
          headers: { Authorization: token },
        }
      );

      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { loading: false, msg: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { msg: err.response?.data.msg || err.message, loading: false },
      });
    }
  };

export const googleLogin =
  ({ userInfo }) =>
  async (dispatch) => {
    if (userInfo)
      try {
        dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

        const res = await axios.post("/auth/google_login", { userInfo });

        dispatch({
          type: AUTH_TYPES.AUTH,
          payload: { token: res.data.accessToken, user: res.data.user },
        });

        localStorage.setItem("LoggedIn", true);

        dispatch({
          type: ALERT_TYPES.ALERT,
          payload: { msg: res.data.msg, loading: false },
        });
      } catch (err) {
        dispatch({
          type: ALERT_TYPES.ALERT,
          payload: {
            loading: false,
            msg: err.response?.data.msg || err.message,
          },
        });
      }
  };

export const facebookLogin =
  ({ response }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

      const res = await axios.post("/auth/facebook_login", {
        userInfo: response,
      });

      dispatch({
        type: AUTH_TYPES.AUTH,
        payload: { token: res.data.accessToken, user: res.data.user },
      });

      localStorage.setItem("LoggedIn", true);

      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: { msg: res.data.msg, loading: false },
      });
    } catch (err) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: {
          loading: false,
          msg: err.response?.data.msg || err.message,
        },
      });
    }
  };

import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const authCtrl = {
  register: async (req, res) => {
    const { username, userId, email, password, cf_password } = req.body;

    try {
      // 1. 유저 입력 검증
      if (!username || !userId || !email || !password || !cf_password)
        return res.status(400).json({ msg: "모든 항목을 입력해주세요." });

      // 2. username 검증
      let modifyUsername = username.toLowerCase().replace(/ /g, "");
      const findusername = await User.findOne({ username: modifyUsername });
      if (findusername)
        return res.status(400).json({ msg: "유저이름이 이미 존재합니다." });
      if (username.length > 20)
        return res
          .status(400)
          .json({ msg: "유저 이름은 20 글자 이하로 입력해주세요." });

      // 3. userId 검증
      let modifyUserId = userId.replace(/ /g, "");
      const findUserId = await User.findOne({ userId: modifyUserId });
      if (findUserId)
        return res.status(400).json({ msg: "이미 사용중인 아이디입니다." });
      if (modifyUserId.length > 20)
        return res
          .status(400)
          .json({ msg: "유저의 아이디는 20 글자 이하로 입력해주세요." });

      // 4. email 검증
      if (!validateEmail(email))
        return res
          .status(400)
          .json({ msg: "올바른 이메일 양식을 입력해주세요." });
      const findUser = await User.findOne({ email });
      if (findUser)
        return res.status(400).json({ msg: "이미 등록된 이메일입니다." });

      // 5. password 검증
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "비밀번호는 최소 6 글자 이상이어야 합니다." });

      // 6. cf_password 검증
      if (cf_password !== password)
        return res
          .status(400)
          .json({ msg: "비밀번호와 비밀번호 확인이 일치하지 않습니다." });

      // password hash
      const passwordHash = await bcrypt.hash(password, 15);

      const newUser = new User({
        username: modifyUsername,
        userId: modifyUserId,
        email,
        password: passwordHash,
      });

      console.log({ newUser });

      // token 발급
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      // db 저장
      await newUser.save();

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/auth/refresh_token",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      res.json({
        msg: "유저 등록이 성공하였습니다.",
        accessToken,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { userId, password } = req.body;

      const user = await User.findOne({ userId });
      const userPassword =
        user && (await bcrypt.compare(password, user.password));
      if (!user || !userPassword)
        return res
          .status(400)
          .json({ msg: "아이디 혹은 비밀번호가 틀립니다." });

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/auth/refresh_token",
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      res.json({
        msg: "정상적으로 로그인이 되었습니다.",
        accessToken,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;
      if (!rf_token)
        return res.status(400).json({ msg: "로그인을 해주시기 바랍니다." });

      const userId = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);

      const accessToken = createAccessToken({ id: userId.id });

      const user = await User.findById(userId.id).select("-password");

      res.json({ accessToken, user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken", { path: "/auth/refresh_token" });
      return res.json({ msg: "정상적으로 로그아웃이 되었습니다." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default authCtrl;

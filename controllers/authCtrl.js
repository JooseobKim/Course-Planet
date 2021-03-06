const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMailCtrl = require("../controllers/sendMailCtrl");

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
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
  registerSendMail: async (req, res) => {
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
      if (modifyUserId.length > 50)
        return res
          .status(400)
          .json({ msg: "유저의 아이디는 50 글자 이하로 입력해주세요." });

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

      const newUser = {
        username: modifyUsername,
        userId: modifyUserId,
        email,
        password: passwordHash,
      };

      // token 발급
      const activationToken = createActivationToken(newUser);
      const url = `${process.env.CLIENT_URL}/auth/activate/${activationToken}`;

      await sendMailCtrl.registerSendMail({
        ...req,
        body: {
          to: email,
          url,
          text: "이메일 인증 확인",
        },
      });

      res.json({
        msg: "이메일을 확인하여 인증 절차를 진행해주세요.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  registerActivateEmail: async (req, res) => {
    try {
      const { activationToken } = req.body;

      const user = jwt.verify(
        activationToken,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { username, userId, email, password } = user;

      const newUser = new User({
        username,
        userId,
        email,
        password,
      });

      // token 발급
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      // db 저장
      await newUser.save();

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/auth/refresh_token",
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
          .status(401)
          .json({ msg: "아이디 혹은 비밀번호가 틀립니다." });

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/auth/refresh_token",
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
        return res.status(401).json({ msg: "로그인을 해주시기 바랍니다." });

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
      res.clearCookie("refreshToken", { path: "/api/auth/refresh_token" });
      return res.json({ msg: "정상적으로 로그아웃이 되었습니다." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  sendMailResetPassword: async (req, res) => {
    try {
      const { email } = req.body;

      if (!validateEmail(email))
        return res
          .status(400)
          .json({ msg: "올바른 이메일 양식을 입력해주세요." });
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "이메일이 존재하지 않습니다." });

      const accessToken = createAccessToken({ id: user._id });
      const url = `${process.env.CLIENT_URL}/reset_pw/${accessToken}`;

      await sendMailCtrl.registerSendMail({
        ...req,
        body: {
          to: email,
          url,
          text: "비밀번호 재설정",
        },
      });

      res.json({ msg: "메일이 전송되었습니다. 이메일을 확인해주세요." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  googleLogin: async (req, res) => {
    try {
      const { userInfo } = req.body;

      const { email, imageUrl, name } = userInfo;

      const randomNum = Math.random().toString().split(".")[1];
      const username = name + randomNum;

      const password = email + process.env.PASSWORD_SECRET;
      const passwordHash = await bcrypt.hash(password, 15);

      const user = await User.findOne({ email });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(401).json({ msg: "패스워드가 일치하지 않습니다." });

        const accessToken = createAccessToken({ id: user._id });
        const refreshToken = createRefreshToken({ id: user._id });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          path: "/api/auth/refresh_token",
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
      } else {
        const newUser = new User({
          username: username.toLowerCase().replace(/ /g, "").slice(0, 20),
          userId: email,
          email,
          password: passwordHash,
          avatar: imageUrl,
        });

        const accessToken = createAccessToken({ id: newUser._id });
        const refreshToken = createRefreshToken({ id: newUser._id });

        await newUser.save();

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          path: "/api/auth/refresh_token",
          maxAge: 1000 * 60 * 60 * 24 * 30,
        });

        res.json({
          msg: "정상적으로 로그인이 되었습니다.",
          accessToken,
          user: {
            ...newUser._doc,
            password: "",
          },
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  facebookLogin: async (req, res) => {
    try {
      const { userInfo } = req.body;

      const {
        email,
        name,
        picture: {
          data: { url },
        },
      } = userInfo;

      const randomNum = Math.random().toString().split(".")[1];
      const username = name + randomNum;

      const password = email + process.env.PASSWORD_SECRET;
      const passwordHash = await bcrypt.hash(password, 15);

      const user = await User.findOne({ email });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(401).json({ msg: "패스워드가 일치하지 않습니다." });

        const accessToken = createAccessToken({ id: user._id });
        const refreshToken = createRefreshToken({ id: user._id });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          path: "/api/auth/refresh_token",
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
      } else {
        const newUser = new User({
          username: username.toLowerCase().replace(/ /g, "").slice(0, 20),
          userId: email,
          email,
          password: passwordHash,
          avatar: url,
        });

        const accessToken = createAccessToken({ id: newUser._id });
        const refreshToken = createRefreshToken({ id: newUser._id });

        await newUser.save();

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          path: "/api/auth/refresh_token",
          maxAge: 1000 * 60 * 60 * 24 * 30,
        });

        res.json({
          msg: "정상적으로 로그인이 되었습니다.",
          accessToken,
          user: {
            ...newUser._doc,
            password: "",
          },
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = authCtrl;

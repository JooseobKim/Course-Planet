import User from "../models/userModel";
import bcrypt from "bcrypt";
import sendMail from "./sendMail";

const userCtrl = {
  updateUser: async (req, res) => {
    try {
      const { username, avatar, mobile, address, auth } = req.body;
      if (!username)
        return res.status(400).json({ msg: "필수 사항들을 입력해주세요." });

      if (auth.user.username !== username) {
        const findUsername = await User.findOne({ username });

        if (findUsername)
          return res
            .status(400)
            .json({ msg: "이미 존재하는 유저 이름입니다." });
      }

      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          username,
          avatar,
          mobile,
          address,
        }
      );

      res.json({ msg: "업데이트가 되었습니다." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password, cf_password } = req.body;
      if (password !== cf_password)
        return res
          .status(400)
          .json({ msg: "비밀번호와 비밀번호 확인이 일치하지 않습니다." });

      const passwordHash = await bcrypt.hash(password, 15);

      await User.findOneAndUpdate(
        { _id: req.user.id },
        { password: passwordHash }
      );

      res.json({ msg: "비밀번호 변경이 성공하였습니다." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.user;

      await User.findByIdAndDelete(id);

      res.clearCookie("refreshToken", { path: "/auth/refresh_token" });

      res.json({ msg: "삭제 성공." });
    } catch (err) {
      return res.stauts(500).json({ msg: err.message });
    }
  },
  contactMeSendMail: async (req, res) => {
    try {
      const { fullname, email, message } = req.body;

      if (!fullname || !email || !message)
        return res.status(400).json({ msg: "모든 항목을 입력해주세요." });

      sendMail({ from: email, fullname, message });

      res.json({ msg: "메세지가 성공적으로 발송되었습니다." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default userCtrl;

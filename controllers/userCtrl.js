import User from "../models/userModel";
import Review from "../models/reviewModel";
import bcrypt from "bcrypt";

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

      res.json({ msg: "유저 정보가 업데이트가 되었습니다." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password, cf_password } = req.body;

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "비밀번호는 최소 6 글자 이상이어야 합니다." });

      if (cf_password !== password)
        return res
          .status(400)
          .json({ msg: "비밀번호와 비밀번호 확인이 일치하지 않습니다." });

      const passwordHash = await bcrypt.hash(password, 15);

      await User.findOneAndUpdate(
        { _id: req.user.id },
        { password: passwordHash }
      );

      res.json({ msg: "비밀번호가 변경되었습니다." });
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
  getDetailUser: async (req, res) => {
    try {
      const { username } = req.body;

      const user = await User.findOne({ username });
      if (!user)
        return res.status(400).json({ msg: "유저가 존재하지 않습니다." });

      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getReviewByUserId: async (req, res) => {
    try {
      const { username } = req.params;

      const user = await User.findOne({ username });
      if (!user)
        return res.status(400).json({ msg: "유저가 존재하지 않습니다." });

      const reviews = await Review.find({ owner: user._id })
        .sort("-createdAt")
        .populate({
          path: "owner likes courseId",
          select: "-password",
        });
      if (!reviews) {
        return res.json({ msg: "리뷰가 존재하지 않습니다." });
      }

      res.json({
        reviews,
        msg: "리뷰를 불러왔습니다.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default userCtrl;

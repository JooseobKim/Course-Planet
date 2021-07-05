import express from "express";
import userCtrl from "../controllers/userCtrl";
import logged from "../middleware/logged";

const userRouter = express.Router();

// 유저 불러오기
userRouter.get("/:username", (req, res) => {
  res.json("h w");
});

// 유저 업데이트
userRouter.patch("/:username", logged, userCtrl.updateUser);

// 유저 비밀번호 업데이트
userRouter.post("/:username", logged, userCtrl.resetPassword);

// 유저 삭제
userRouter.delete("/:username", (req, res) => {
  res.json("h w");
});

// 유저 검색
userRouter.get("/search", (req, res) => {
  res.json("h w");
});

export default userRouter;

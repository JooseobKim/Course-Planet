import express from "express";

const userRouter = express.Router();

// 유저 불러오기
userRouter.get("/:username", (req, res) => {
  res.json("h w");
});

// 유저 업데이트
userRouter.patch("/:username", (req, res) => {
  res.json("h w");
});

// 유저 비밀번호 업데이트
userRouter.post("/:username", (req, res) => {
  res.json("h w");
});

// 유저 삭제
userRouter.delete("/:username", (req, res) => {
  res.json("h w");
});

// 유저 검색
userRouter.get("/search", (req, res) => {
  res.json("h w");
});

export default userRouter;

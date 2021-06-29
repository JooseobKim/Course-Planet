import express from "express";

const authRouter = express.Router();

// 회원가입
authRouter.post("/register", (req, res) => {
  res.json("h w");
});

// 로그인
authRouter.post("/login", (req, res) => {
  res.json("h w");
});

// 로그아웃
authRouter.post("/logout", (req, res) => {
  res.json("h w");
});

// 토큰 재생성
authRouter.post("/refresh_token", (req, res) => {
  res.json("h w");
});

export default authRouter;

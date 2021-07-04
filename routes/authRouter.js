import express from "express";
import authCtrl from "../controllers/authCtrl";

const authRouter = express.Router();

// 회원가입
authRouter.post("/register", authCtrl.register);

// 로그인
authRouter.post("/login", authCtrl.login);

// 로그아웃
authRouter.post("/logout", authCtrl.logout);

// 토큰 재생성
authRouter.post("/refresh_token", authCtrl.refreshToken);

export default authRouter;

import express from "express";
import authCtrl from "../controllers/authCtrl";

const authRouter = express.Router();

// 회원가입
authRouter.post("/register", authCtrl.registerSendMail);

// 회원가입 이메일 인증
authRouter.post("/activate_email", authCtrl.registerActivateEmail);

// 패스워드 이메일 인증
authRouter.post("/send_mail_reset_pw", authCtrl.sendMailResetPassword);

// 로그인
authRouter.post("/login", authCtrl.login);

// 로그아웃
authRouter.post("/logout", authCtrl.logout);

// 토큰 재생성
authRouter.post("/refresh_token", authCtrl.refreshToken);

export default authRouter;

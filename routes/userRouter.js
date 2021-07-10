import express from "express";
import sendMail from "../controllers/sendMailCtrl";
import userCtrl from "../controllers/userCtrl";
import logged from "../middleware/logged";
import sendMailCtrl from "../controllers/sendMailCtrl";

const userRouter = express.Router();

// Contact Me 메일 보내기
userRouter.post("/contact_send_mail", sendMailCtrl.contactMeSendMail);

// 유저 비밀번호 업데이트
userRouter.post("/reset_password", logged, userCtrl.resetPassword);

// 유저 불러오기
userRouter.get("/:username", (req, res) => {
  res.json("h w");
});

// 유저 업데이트
userRouter.patch("/:username", logged, userCtrl.updateUser);

// 유저 삭제
userRouter.delete("/:username", logged, userCtrl.deleteUser);

// 유저 검색
userRouter.get("/search", (req, res) => {
  res.json("h w");
});

export default userRouter;

import express from "express";
import userCtrl from "../controllers/userCtrl";
import logged from "../middleware/logged";
import sendMailCtrl from "../controllers/sendMailCtrl";

const userRouter = express.Router();

// Contact Me 메일 보내기
userRouter.post("/contact_send_mail", sendMailCtrl.contactMeSendMail);

// 유저 비밀번호 업데이트
userRouter.post("/reset_password", logged, userCtrl.resetPassword);

// 유저 작성 리뷰 불러오기
userRouter.get("/:username/review", userCtrl.getReviewByUserId);

// 유저 불러오기
userRouter.get("/:username", userCtrl.getDetailUser);

// 유저 업데이트
userRouter.patch("/:username", logged, userCtrl.updateUser);

// 유저 삭제
userRouter.delete("/:username", logged, userCtrl.deleteUser);

export default userRouter;

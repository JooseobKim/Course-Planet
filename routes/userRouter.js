const express = require("express");
const userCtrl = require("../controllers/userCtrl");
const logged = require("../middleware/logged");
const sendMailCtrl = require("../controllers/sendMailCtrl");

const userRouter = express.Router();

// Contact Me 메일 보내기
userRouter.post("/contact_send_mail", sendMailCtrl.contactMeSendMail);

// 유저 비밀번호 업데이트
userRouter.post("/reset_password", logged, userCtrl.resetPassword);

// 유저 작성 리뷰 불러오기
userRouter.get("/:username/review", userCtrl.getReviewByUserId);

// 유저 불러오기, 업데이트, 삭제
userRouter
  .route("/:username")
  .get(userCtrl.getDetailUser)
  .patch(logged, userCtrl.updateUser)
  .delete(logged, userCtrl.deleteUser);

module.exports = userRouter;

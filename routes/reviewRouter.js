import express from "express";
import reviewCtrl from "../controllers/reviewCtrl";
import logged from "../middleware/logged";

const reviewRouter = express.Router();

// 리뷰 생성
reviewRouter.post("/", logged, reviewCtrl.createReview);

// 리뷰 수정
reviewRouter.patch("/", logged, reviewCtrl.updateReview);

// 리뷰 삭제
reviewRouter.delete("/", logged, reviewCtrl.deleteReview);

export default reviewRouter;

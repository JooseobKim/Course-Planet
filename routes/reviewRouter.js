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

// 리뷰 좋아요 활성화
reviewRouter.patch("/:id/like", logged, reviewCtrl.likeReview);

// 리뷰 좋아요 비활성화
reviewRouter.patch("/:id/unlike", logged, reviewCtrl.unlikeReview);

export default reviewRouter;

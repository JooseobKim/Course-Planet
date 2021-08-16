const express = require("express");
const reviewCtrl = require("../controllers/reviewCtrl");
const logged = require("../middleware/logged");

const reviewRouter = express.Router();

// 리뷰 생성, 수정, 삭제
reviewRouter
  .route("/")
  .post(logged, reviewCtrl.createReview)
  .patch(logged, reviewCtrl.updateReview)
  .delete(logged, reviewCtrl.deleteReview);

// 리뷰 좋아요 활성화
reviewRouter.patch("/:id/like", logged, reviewCtrl.likeReview);

// 리뷰 좋아요 비활성화
reviewRouter.patch("/:id/unlike", logged, reviewCtrl.unlikeReview);

// 리뷰 가져오기
reviewRouter.get("/:courseId", reviewCtrl.getReviews);

module.exports = reviewRouter;

import express from "express";

const reviewRouter = express.Router();

// 리뷰 불러오기
reviewRouter.get("/", (req, res) => {
  res.json("h w");
});

// 리뷰 생성
reviewRouter.post("/", (req, res) => {
  res.json("h w");
});

// 리뷰 수정
reviewRouter.patch("/", (req, res) => {
  res.json("h w");
});

// 유저 삭제
reviewRouter.delete("/", (req, res) => {
  res.json("h w");
});

export default reviewRouter;

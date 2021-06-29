import express from "express";

const courseRouter = express.Router();

// 강의 불러오기
courseRouter.get("/", (req, res) => {
  res.json("h w");
});

// 인프런 플랫폼 스크래핑
courseRouter.post("/admin/inflearn", (req, res) => {
  res.json("h w");
});

// 패스트 캠퍼스 플랫폼 스크래핑
courseRouter.post("/admin/fastcampus", (req, res) => {
  res.json("h w");
});

// 강의 데이터베이스에 저장하기
courseRouter.post("/admin/save_data", (req, res) => {
  res.json("h w");
});

// 개별 강의 불러오기
courseRouter.get("/:id", (req, res) => {
  res.json("h w");
});

// 코스 검색
courseRouter.get("/search", (req, res) => {
  res.json("h w");
});

export default courseRouter;

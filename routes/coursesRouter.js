const express = require("express");
const coursesCtrl = require("../controllers/coursesCtrl");
const admin = require("../middleware/admin");
const logged = require("../middleware/logged");

const courseRouter = express.Router();

// 인프런 강의 스크래핑
courseRouter.post(
  "/admin/inflearn",
  logged,
  admin,
  coursesCtrl.scrapingInflearnCourses
);

// 패스트캠퍼스 강의 스크래핑
courseRouter.post(
  "/admin/fastcampus",
  logged,
  admin,
  coursesCtrl.scrapingFastcampusCourses
);

// 강의 데이터베이스에 저장하기
courseRouter.post("/admin/save_data", logged, admin, coursesCtrl.saveCourses);

// 강의 불러오기
courseRouter.get("/", coursesCtrl.getCourses);

// 리뷰가 가장 많이 작성된 강의 불러오기
courseRouter.get("/most_review", coursesCtrl.getMostReviewCourses);

// 최근 리뷰 작성 강의 불러오기
courseRouter.get("/recent_review", coursesCtrl.getRecentReviewCourses);

// 최근 추가된 강의 불러오기
courseRouter.get("/recent_add", coursesCtrl.getRecentAddCourses);

// 개별 강의 불러오기
courseRouter.get("/:id", coursesCtrl.getCourse);

module.exports = courseRouter;

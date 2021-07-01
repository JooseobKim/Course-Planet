import express from "express";
import coursesCtrl from "../controllers/coursesCtrl";

const courseRouter = express.Router();

// 인프런 강의 스크래핑
courseRouter.post("/admin/inflearn", coursesCtrl.scrapingInflearnCourses);

// 패스트캠퍼스 강의 스크래핑
courseRouter.post("/admin/fastcampus", coursesCtrl.scrapingFastcampusCourses);

// 강의 데이터베이스에 저장하기
courseRouter.post("/admin/save_data", coursesCtrl.saveCourses);

// 코스 검색
courseRouter.get("/search", coursesCtrl.searchCourse);

// 최근 리뷰 작성 강의 불러오기 [리뷰 파트 작성 후에 진행]
// courseRouter.get("/recent_review", coursesCtrl.getRecentReview);

// 최근 리뷰 작성 강의 불러오기 [리뷰 파트 작성 후에 진행]
// courseRouter.get("/recent_review", coursesCtrl.getMostReview);

// 강의 불러오기
courseRouter.get("/", coursesCtrl.getCourses);

// 개별 강의 불러오기
courseRouter.get("/:id", coursesCtrl.getCourse);

export default courseRouter;

const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Review = require("../models/reviewModel");

class QueryFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  sort() {
    switch (this.queryString.sort) {
      case "recent":
        this.query = this.query.sort("-createdAt");
        break;
      case "lastest":
        this.query = this.query.sort("createdAt");
        break;
      case "likes":
        this.query = this.query.sort("-likes");
        break;
      default:
        break;
    }

    return this;
  }
}

const reviewCtrl = {
  createReview: async (req, res) => {
    try {
      const { difficulty, merit, demerit, rating, userId, courseId } = req.body;

      const existReview = await Review.findOne({ owner: userId, courseId });
      if (existReview)
        return res.status(400).json({ msg: "이미 리뷰를 작성하였습니다." });

      const owner = await User.findById(userId);
      if (!owner)
        return res
          .status(400)
          .json({ msg: "유저가 더 이상 존재하지 않습니다." });

      const course = await Course.findById(courseId);
      if (!course)
        return res
          .status(400)
          .json({ msg: "강의가 더 이상 존재하지 않습니다." });

      if (
        difficulty !== "easy" &&
        difficulty !== "normal" &&
        difficulty !== "hard" &&
        difficulty !== "expert"
      )
        return res
          .status(400)
          .json({ msg: "강의 난이도를 알맞게 설정해주세요." });

      if (merit.length < 30 || demerit.length < 30)
        return res
          .status(400)
          .json({ msg: "장점 혹은 단점을 최소 30 글자 이상 입력해주세요." });

      if (rating > 5 || rating <= 0)
        return res
          .status(400)
          .json({ msg: "평점은 1 이상 5 이하의 값을 입력해주세요." });

      const newReview = new Review({
        owner: userId,
        courseId,
        merit,
        demerit,
        rating,
        difficulty,
      });

      await Course.findOneAndUpdate(
        { _id: courseId },
        {
          $push: { review: newReview._id },
        },
        { new: true }
      );

      await newReview.save();

      res.json({ newReview, course, msg: "리뷰 저장 완료." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateReview: async (req, res) => {
    try {
      const { userId, merit, demerit } = req.body;

      if (merit.length < 30 || demerit.length < 30)
        return res
          .status(400)
          .json({ msg: "장점 혹은 단점을 최소 30 글자 이상 입력해주세요." });

      await Review.findOneAndUpdate({ owner: userId }, { merit, demerit });

      res.json({ msg: "리뷰 업데이트 성공." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteReview: async (req, res) => {
    try {
      const { id } = req.user;

      const deleteReview = await Review.findOneAndDelete({ owner: id });

      await Course.findOneAndUpdate(
        { _id: deleteReview.courseId },
        {
          $pull: { review: deleteReview._id },
        }
      );

      res.json({ msg: "리뷰 삭제 완료." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  likeReview: async (req, res) => {
    try {
      const existLike = await Review.find({
        _id: req.params.id,
        likes: req.user.id,
      });
      if (existLike.length > 0)
        return res
          .status(400)
          .json({ msg: "이미 리뷰에 좋아요를 눌렀습니다." });

      await Review.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user.id },
        },
        { new: true }
      );

      res.json({ msg: "좋아요를 눌렀습니다!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unlikeReview: async (req, res) => {
    try {
      await Review.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user.id },
        },
        { new: true }
      );

      res.json({ msg: "좋아요를 취소했습니다." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getReviews: async (req, res) => {
    try {
      const { courseId } = req.params;

      const queryResult = new QueryFeatures(
        Review.find({ courseId }),
        req.query
      ).sort();

      const reviews = await queryResult.query.populate("owner likes");

      res.json({
        msg: "데이터 찾기 성공.",
        reviews,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = reviewCtrl;

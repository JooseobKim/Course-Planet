const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      ref: "course",
    },
    merit: {
      type: String,
      required: true,
    },
    demerit: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("review", reviewSchema);

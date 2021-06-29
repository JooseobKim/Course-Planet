import mongoose from "mongoose";

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

export default mongoose.model("review", reviewSchema);

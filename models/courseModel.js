const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    instructor: { type: String, default: "자료 없음" },
    description: { type: String, default: "자료 없음" },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/duw5jvlb4/image/upload/v1624383950/samples/no-image_dfpama.png",
    },
    price: {
      type: String,
      default: "자료 없음",
    },
    url: {
      type: String,
      required: true,
    },
    platform: { type: String, required: true },
    review: [{ type: mongoose.Types.ObjectId, ref: "review" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("course", courseSchema);

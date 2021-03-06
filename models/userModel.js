const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 20,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/duw5jvlb4/image/upload/v1624169200/samples/avatar_default6_ctvu5b.png",
    },
    role: {
      type: Number,
      default: 0,
    },
    mobile: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);

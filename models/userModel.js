import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      maxlength: 15,
    },
    lastname: {
      type: String,
      required: true,
      maxlength: 10,
    },
    nickname: {
      type: String,
      required: true,
      maxlength: 20,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
      maxlength: 20,
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

export default mongoose.model("user", userSchema);

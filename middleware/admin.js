import User from "../models/userModel";

const admin = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user.id });

    if (user.role !== 1)
      return res.status(403).json({ msg: "권한이 거부되었습니다." });

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export default admin;

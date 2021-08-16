const jwt = require("jsonwebtoken");

const logged = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.status(403).json({ msg: "유효하지 않은 접근입니다." });

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = logged;

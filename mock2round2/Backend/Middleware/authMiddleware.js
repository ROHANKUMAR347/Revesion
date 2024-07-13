const jwt = require("jsonwebtoken");
// middlewere
const User = require("../Models/User");
const secret = process.env.JWT_SECRET;
module.exports = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      throw new Error();
    }
    req.user = { userId: user._id };
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

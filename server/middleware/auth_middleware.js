const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("No token found");
  }
});

module.exports = protect;

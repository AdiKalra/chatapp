const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const getToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, dp, password } = req.body;

  if (!name || !email || !password) {
    res.status(404);
    throw new Error("All fields are required");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  const user = await User.create({
    name,
    email,
    password,
    dp,
  });

  if (user) {
    const filteredUserData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      dp: user.dp,
      token: getToken(user._id),
    };
    return res.send(filteredUserData);
  } else {
    res.status(400);
    throw new Error("Unable to create user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password field can't be empty");
  }

  const user = await User.findOne({ email });
  if (user && (await user.verify_password(password))) {
    const filteredUserData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      dp: user.dp,
      token: getToken(user._id),
    };
    return res.send(filteredUserData);
  } else {
    res.status(400);
    throw new Error("Bad credentials");
  }
});

// /api/user?search=xyz
const findusers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: new RegExp(req.query.search, "i") },
          { email: new RegExp(req.query.search, "i") },
        ],
      }
    : {};
  const result = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(result);
  res.end();
});

module.exports = { registerUser, authUser, findusers };

const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("user id param not found");
    return res.status(400);
  }

  let isChat = await Chat.find({
    isGrouped: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email dp",
  });

  if (isChat.length > 0) {
    res.send(isChat);
  } else {
    var newChatData = {
      //   chatName: "sender",
      chatName: (await User.find({ _id: userId }).select("name"))[0].name,
      isGrouped: false,
      users: [req.user._id, userId],
    };
    try {
      const newChat = await Chat.create(newChatData);

      const fullChat = await Chat.findOne({ _id: newChat._id }).populate(
        "users",
        "-password"
      );
      console.log("Chat Created");
      res.send(fullChat);
    } catch (err) {
      res.status(400);
      throw new Error(err.message);
    }
  }
});

const fetchChat = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } }).then((result) =>
      res.send(result)
    );
  } catch (err) {
    res.status(400);
    throw new Error("No chat found");
  }
});

const createGroupChat = asyncHandler(async (req, res) => {});

const renameGroupChat = asyncHandler(async (req, res) => {});

const removeFromGroupChat = asyncHandler(async (req, res) => {});

const addToGroupChat = asyncHandler(async (req, res) => {});

module.exports = {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroupChat,
  removeFromGroupChat,
  addToGroupChat,
};

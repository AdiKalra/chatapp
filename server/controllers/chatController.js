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

    console.log(isChat);

    if (isChat.length) {
      console.log("found chat");
      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name email dp",
      });
      console.log(isChat);
      return res.send(isChat);
    } else {
      let user = (await User.find({ _id: userId }))[0];
      let newChatData = {
        chatName: user.name,
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
    const result = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("admin", "-password");
    res.send(result);
  } catch (err) {
    res.status(400);
    throw new Error("No chat found");
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  console.log("create groupchat fn called");
  if (!req.body.users || !req.body.name) {
    res.status(400);
    return res.send({ message: "Please fill all the fields" });
  }

  let users = req.body.users;
  if (users.length < 2) {
    res.status(400);
    return res.send("More than two users are required to create a group chat");
  }

  users.push(req.user);

  try {
    const newgroup = {
      chatName: req.body.name,
      users: users,
      isGrouped: true,
      admin: req.user._id,
    };

    const groupchat = await Chat.create(newgroup);
    const gpChat = await User.populate(groupchat, {
      path: "users",
      select: "-password",
    });
    const fullGroupChat = await gpChat.populate("admin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

const renameChat = asyncHandler(async (req, res) => {
  const { name, chatId } = req.body;

  const updateChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName: name },
    { new: true }
  )
    .populate("users", "-password")
    .populate("admin", "-password");

  if (!updateChat) {
    res.status(400);
    return res.send("chat not found");
  } else {
    res.send(updateChat);
  }
});

const addToGroupChat = asyncHandler(async (req, res) => {
  const { users, chatId } = req.body;

  const updatedChat = await Chat.findOneAndUpdate(
    { _id: chatId, isGrouped: true },
    {
      $addToSet: { users: users },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("admin", "-password");
  if (!updatedChat) {
    res.status(400);
    throw new Error("Chat not found or not a group chat");
  } else {
    return res.send(updatedChat);
  }
});

const removeFromGroupChat = asyncHandler(async (req, res) => {
  const { users, chatId } = req.body;

  const updatedChat = await Chat.findOneAndUpdate(
    { _id: chatId, isGrouped: true },
    {
      $pull: { users: users },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("admin", "-password");

  if (!updatedChat) {
    res.status(400);
    return res.send("Chat not found");
  } else {
    return res.status(200).send(updatedChat);
  }
});

module.exports = {
  accessChat,
  fetchChat,
  createGroupChat,
  renameChat,
  removeFromGroupChat,
  addToGroupChat,
};

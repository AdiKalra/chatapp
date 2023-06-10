const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");


const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("Invalid data passes");
    return res.status(400);
  }
  let new_message = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    let message = await Message.create(new_message);
    message = await message.populate("sender", "name dp");
    message = await message.populate("chat");
    message = await message.populate("chat.users", "-password");
    
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    return res.send(message);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

const fetchAllMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email dp")
      .populate("chat");
    res.send(messages);
  } catch (err) {}
});

module.exports = { sendMessage, fetchAllMessages };

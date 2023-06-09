const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    // chatName: { type: String, trim: true, unique: true },
    isGrouped: { type: Boolean, default: false },
    chatName: {
      type: String,
      trim: true,
      require: true,
      index: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

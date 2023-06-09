const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth_middleware");
const {
  sendMessage,
  fetchAllMessages,
} = require("../controllers/messageController");

router.post("/", protect, sendMessage);
router.get("/:chatId", protect, fetchAllMessages);

module.exports = router;

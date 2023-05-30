const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth_middleware");
const {
  accessChat,
  fetchChat,
  createGroupChat,
  renameChat,
  removeFromGroupChat,
  addToGroupChat,
} = require("../controllers/chatController");

router.post("/", protect, accessChat);
router.get("/", protect, fetchChat);
router.post("/group", protect, createGroupChat);
router.put("/group/rename", protect, renameChat);
router.put("/group/remove", protect, removeFromGroupChat);
router.put("/group/add", protect, addToGroupChat);

module.exports = router;

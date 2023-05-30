const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth_middleware");
const {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroupChat,
  removeFromGroupChat,
  addToGroupChat,
} = require("../controllers/chatController");

router.post("/", protect, accessChat);
router.get("/", protect, fetchChat);
router.post("/group", protect, createGroupChat);
router.put("/group/rename/:gpId", renameGroupChat);
router.put("/group/remove/:gpid/:userid", removeFromGroupChat);
router.put("/group/:gpid/:userid", addToGroupChat);

module.exports = router;

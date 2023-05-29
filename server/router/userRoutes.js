const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  findusers,
} = require("../controllers/userController");

const protect = require("../middleware/auth_middleware")

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/", protect, findusers);


module.exports = router;

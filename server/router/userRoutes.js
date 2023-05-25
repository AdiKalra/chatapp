const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  allusers,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/", allusers);


module.exports = router;

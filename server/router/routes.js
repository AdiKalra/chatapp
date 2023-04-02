const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("home route");
    res.end();
})

module.exports = router

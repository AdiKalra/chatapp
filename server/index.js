const express = require("express");
// const http = require("http");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
dotenv.config();
app.use(cors());
// const chats = require("./data");
connectDB();

app.get("/", (req, res) => {
  // const filePath = path.join(__dirname, "../", "/client/public/index.html");
  // res.sendFile(filePath);
  res.end(() => console.log("end"));
});
// app.get("/api/chats", (req, res) => {
//   res.send(chats);
//   res.end();
// });
// app.get("/api/chat/:_id", (req, res) => {
//   const _id = req.params._id;
//   const chat = chats.filter((chat) => chat._id === _id);
//   res.send(chat);
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});

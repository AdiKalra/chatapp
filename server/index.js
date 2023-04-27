// const express = require("express");
// const http = require("http")
// const socketio = require("socket.io");
// const app = express();
// const server = http.createServer(app)
// const PORT = 8000
// const io = socketio(server)
// const router = require("./router/routes");
// const { error } = require("console");
// app.use(router);
// io.on("connection", (socket) => {
//   console.log("connection successful");
//   socket.on("join", ({ name, room }, callback) => {
//     const error = true;
//     if (error) {
//       callback({ error: "something went wrong" });
//     }
//   });
//   // console.log("connection successful")
//   socket.on("disconnect", () => {
//     console.log("disconnection successful");
//   });
// });
// server.prependListener("request", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
// });
// server.listen(PORT, ()=>{
//     console.log(`server listening on port ${PORT}`)
// })

// Practice code
const express = require("express");
// const http = require("http");
const app = express();
const dotenv = require("dotenv");
var cors = require("cors");

dotenv.config();

const chats = require("./data");


app.use(cors())
app.get("/", (req, res) => {
  res.send("API is running");
  res.end();
});
app.get("/api/chats", (req, res) => {
  res.send(chats);
  res.end();
});
app.get("/api/chat/:_id", (req, res) => {
  const _id = req.params._id;
  const chat = chats.filter((chat) => chat._id === _id);
  res.send(chat);
});



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("server started");
});

const express = require("express");
const http = require("http")
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app)
const PORT = 8000
const io = socketio(server)
const router = require("./router/routes");
const { error } = require("console");
app.use(router);
io.on("connection", (socket) => {
  console.log("connection successful");
  socket.on("join", ({ name, room }, callback) => {
    const error = true;
    if (error) {
      callback({ error: "something went wrong" });
    }
  });
  // console.log("connection successful")
  socket.on("disconnect", () => {
    console.log("disconnection successful");
  });
});
server.prependListener("request", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
});
server.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`)
})
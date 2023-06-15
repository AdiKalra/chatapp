const express = require("express");
const http = require("http");
const app = express();
// const server = http.createServer(app)
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const socket = require("socket.io");
const path = require("path");
const userRoutes = require("./router/userRoutes");
const chatRoutes = require("./router/chatRoutes");
const messageRoutes = require("./router/messageRoutes");
const { not_found, error_handling } = require("./middleware/error_middleware");
// const User = require("./models/userModel");

dotenv.config();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// -------------------------Deployment---------------------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/client/build")));
  app.get("/", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
  );
}

app.use(not_found);
app.use(error_handling);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});

const io = socket(server, {
  pingTimeout: 60000,
  // cors: {
  //   origin: "http://localhost:3000",
  // },
});

io.on("connection", (socket) => {
  // console.log("connected to socket.io id: ", socket.id);
  // console.log("connected to s/ocket.io");

  socket.on("setup", (user_data) => {
    socket.join(user_data._id);
    // console.log(user_data._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    // console.log("User joined room: ", room);
  });

  socket.on("new message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;
    if (!chat.users) {
      return console.log("chat.users not defined");
    }
    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  // socket.on("typing", (room) => {
  //   socket.in(room).emit("typing");
  // });

  // socket.on("stop typing", (room) => {
  //   socket.in(room).emit("stop typing");
  // });

  socket.off("setup", () => {
    socket.leave(user_data._id);
  });
});





const express = require("express");
// const http = require("http");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
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

const __dirname1 = path.resolve();

app.use(express.static(path.join(__dirname1, "/client/public")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname1, "client", "public", "index.html"))
);

app.use(not_found);
app.use(error_handling);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});

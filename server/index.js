const express = require("express");
// const http = require("http");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
// const path = require("path");
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
app.use(not_found);
app.use(error_handling);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});

// const testfn = async () => {
//   const result = await User.find({ _id: "64709b161bc178baf17dd1a6" }).select(
//     "name"
//   );
//   console.log(result[0].name);
// };

// testfn();
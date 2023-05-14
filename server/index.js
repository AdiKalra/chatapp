const express = require("express");
// const http = require("http");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const userRoutes = require("./router/userRoutes");
const { not_found, error_handling } = require("./middleware/error_middleware");

dotenv.config();
app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/user", userRoutes);
app.use(not_found);
app.use(error_handling);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "public", "index.html"));
  res.end();
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});

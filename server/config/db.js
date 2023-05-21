const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://adikalra729:adikalra729@cluster0.afgx4nt.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connection Successfull`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;

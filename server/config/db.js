const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = connectDB;

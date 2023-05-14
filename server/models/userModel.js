const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dp: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const salt = await bcryptjs.genSalt(10);
  this.password = bcryptjs.hash(this.password, salt);
});

userSchema.methods.verify_password = async function (input_password) {
  const verified = await bcryptjs.compare(input_password, this.password);
  console.log("usermodel verified: ", verified);
  return verified;
};

const User = mongoose.model("User", userSchema);
module.exports = User;

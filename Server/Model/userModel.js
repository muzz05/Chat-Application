const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  isImageSet: {
    type: Boolean,
    default: false,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Users", userSchema);

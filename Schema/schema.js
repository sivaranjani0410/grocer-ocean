const mongoose = require("mongoose");
const signUpTemp = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  PassWord: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  FeedBack: String,
  Orders: Array,
});

module.exports = mongoose.model("SignUp-Data", signUpTemp);

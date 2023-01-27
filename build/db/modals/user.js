"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
var _mongoose = require("mongoose");
const userSchema = new _mongoose.Schema({
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  picture: {
    type: String
  }
});
const User = (0, _mongoose.model)("User", userSchema);
exports.User = User;
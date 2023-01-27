"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function init() {
  const mongodbUrl = process.env.MONGODB_URL;
  return _mongoose.default.connect(mongodbUrl, function () {
    return console.log("connected successfully to database");
  });
}
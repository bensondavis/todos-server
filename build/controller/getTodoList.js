"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _todos = _interopRequireDefault(require("../db/modals/todos"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getTodoList = async function (req, res) {
  try {
    _todos.default.findOne({
      email: req.user
    }).then(function (data) {
      if (data) return res.status(200).send(data);
    }).catch(function (err) {
      return res.status(500).send("Could not get todo list");
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
var _default = getTodoList;
exports.default = _default;
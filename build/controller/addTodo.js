"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _todos = _interopRequireDefault(require("../db/modals/todos"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const addTodo = async function (req, res) {
  try {
    _todos.default.findOneAndUpdate({
      email: req.user
    }, {
      $push: {
        todoList: req.body.content
      }
    }, {
      upsert: true
    }).catch(function (err) {
      return res.status(500).send("Could not add task");
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
var _default = addTodo;
exports.default = _default;
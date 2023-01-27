"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTodoItem = exports.updateTodoCompleted = exports.updateAllTodo = void 0;
var _todos = _interopRequireDefault(require("../db/modals/todos"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const updateTodoItem = async function (req, res) {
  try {
    _todos.default.findOneAndUpdate({
      email: req.user + 1,
      "todoList.id": req.body.id
    }, {
      $set: {
        "todoList.$.todoItem": req.body.todoItem
      }
    }).catch(function (err) {
      return res.status(500).send("Could not update task");
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
exports.updateTodoItem = updateTodoItem;
const updateTodoCompleted = async function (req, res) {
  try {
    _todos.default.findOneAndUpdate({
      email: req.user,
      "todoList.id": req.body.id
    }, {
      $set: {
        "todoList.$.completed": req.body.completed
      }
    }).catch(function (err) {
      return res.status(500).send("Could not update task");
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
exports.updateTodoCompleted = updateTodoCompleted;
const updateAllTodo = async function (req, res) {
  try {
    _todos.default.updateMany({
      email: req.user
    }, {
      $set: {
        "todoList.$[].completed": req.body.completed
      }
    }).catch(function (err) {
      return res.status(500).send("Could not update task");
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
exports.updateAllTodo = updateAllTodo;
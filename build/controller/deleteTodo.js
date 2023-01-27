"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTodo = exports.deleteCompleted = void 0;
var _todos = _interopRequireDefault(require("../db/modals/todos"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const deleteTodo = async function (req, res) {
  try {
    _todos.default.updateOne({
      email: req.user
    }, {
      $pull: {
        todoList: {
          id: req.body.id
        }
      }
    }).catch(function (err) {
      return res.status(500).send("Could not delete task");
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
exports.deleteTodo = deleteTodo;
const deleteCompleted = function (req, res) {
  try {
    _todos.default.updateMany({
      email: req.user
    }, {
      $pull: {
        todoList: {
          completed: true
        }
      }
    }).catch(function (err) {
      return res.status(500).send("Could not delete tasks");
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
exports.deleteCompleted = deleteCompleted;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTodoItem = exports.updateTodoCompleted = exports.updateAllTodo = void 0;
var _todos = _interopRequireDefault(require("../db/modals/todos"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const updateTodoItem = async function (req, res) {
  if (req.headers["authorization"]) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).json({
      message: "task failed"
    });
    _jsonwebtoken.default.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) return res.sendStatus(403);
    });
  } else {
    return res.sendStatus(403);
  }
  try {
    await _todos.default.findOneAndUpdate({
      email: req.body.email,
      "todoList.id": req.body.id
    }, {
      $set: {
        "todoList.$.todoItem": req.body.todoItem
      }
    }, {
      new: true
    }).then(function (data) {
      return res.status(200).send("updated successfully");
    }).catch(function (err) {
      console.log({
        err
      });
    });
  } catch (err) {
    console.log("catch err: " + err);
  }
};
exports.updateTodoItem = updateTodoItem;
const updateTodoCompleted = async function (req, res) {
  if (req.headers["authorization"]) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).json({
      message: "task failed"
    });
    _jsonwebtoken.default.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) return res.sendStatus(403);
    });
  } else {
    return res.sendStatus(403);
  }
  try {
    await _todos.default.findOneAndUpdate({
      email: req.body.email,
      "todoList.id": req.body.id
    }, {
      $set: {
        "todoList.$.completed": req.body.completed
      }
    }, {
      new: true
    }).then(function (data) {
      return res.status(200).send("updated successfully");
    }).catch(function (err) {
      console.log({
        err
      });
    });
  } catch (err) {
    console.log("catch err: " + err);
  }
};
exports.updateTodoCompleted = updateTodoCompleted;
const updateAllTodo = async function (req, res) {
  if (req.headers["authorization"]) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).json({
      message: "task failed"
    });
    _jsonwebtoken.default.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) return res.sendStatus(403);
    });
  } else {
    return res.sendStatus(403);
  }
  try {
    const result = await _todos.default.updateMany({
      email: req.body.email
    }, {
      $set: {
        "todoList.$[].completed": req.body.completed
      }
    });
    console.log({
      result
    });
  } catch (err) {
    console.log({
      err
    });
  }
};
exports.updateAllTodo = updateAllTodo;
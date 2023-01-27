"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTodo = exports.deleteCompleted = void 0;
var _todos = _interopRequireDefault(require("../db/modals/todos"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const deleteTodo = async function (req, res) {
  try {
    if (req.headers["authorization"]) {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.status(401).send("task failed");
      _jsonwebtoken.default.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) return res.status(401).send("Not authorised");else {
          _todos.default.updateOne({
            email: req.body.email
          }, {
            $pull: {
              todoList: {
                id: req.body.id
              }
            }
          }).then(function (data) {
            console.log(data);
            if (data.modifiedCount !== 0) return res.sendStatus(201);else return res.sendStatus(304);
          }).catch(function (err) {
            console.log(err);
            return res.status(500).send("Could not add item");
          });
        }
      });
    } else {
      return res.sendStatus(403);
    }
  } catch (err) {
    console.log({
      err
    });
  }
};
exports.deleteTodo = deleteTodo;
const deleteCompleted = function (req, res) {
  try {
    if (req.headers["authorization"]) {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.status(401).send("task failed");
      _jsonwebtoken.default.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) return res.status(401).send("Not authorised");else {
          _todos.default.updateMany({
            email: req.body.email
          }, {
            $pull: {
              todoList: {
                completed: true
              }
            }
          }).then(function (data) {
            console.log(data);
            if (data.modifiedCount !== 0) return res.sendStatus(201);else return res.sendStatus(304);
          }).catch(function (err) {
            console.log(err);
            return res.status(500).send("Could not add item");
          });
        }
      });
    } else {
      return res.sendStatus(403);
    }
  } catch (err) {
    console.log({
      err
    });
  }
};
exports.deleteCompleted = deleteCompleted;
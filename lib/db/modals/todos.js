"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
const todosSchema = new _mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true
  },
  todoList: [{
    id: {
      type: String,
      required: true
    },
    todoItem: String,
    completed: Boolean,
    updated: {
      type: Date,
      default: Date.now
    }
  }]
});
const Todos = (0, _mongoose.model)("Todos", todosSchema);
var _default = Todos;
exports.default = _default;
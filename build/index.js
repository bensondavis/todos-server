"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cors = _interopRequireDefault(require("cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _init = require("./db/init");
var _addTodo = _interopRequireDefault(require("./controller/addTodo"));
var _login = _interopRequireDefault(require("./controller/login"));
var _signup = _interopRequireDefault(require("./controller/signup"));
var _getTodoList = _interopRequireDefault(require("./controller/getTodoList"));
var _updateTodo = require("./controller/updateTodo");
var _deleteTodo = require("./controller/deleteTodo");
var _AuthenticateToken = _interopRequireDefault(require("./functions/AuthenticateToken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
if (process.env.NODE_ENV !== "production") {
  _dotenv.default.config();
}
const app = (0, _express.default)();
const port = process.env.PORT;
(0, _init.init)().catch(function (e) {
  return console.log(e.message);
});
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.post("/add-todo", _AuthenticateToken.default, _addTodo.default);
app.post("/signup", _signup.default);
app.post("/login", _login.default);
app.post("/get-todo-list", _AuthenticateToken.default, _getTodoList.default);
app.post("/update-todo-item", _AuthenticateToken.default, _updateTodo.updateTodoItem);
app.post("/update-todo-completed", _AuthenticateToken.default, _updateTodo.updateTodoCompleted);
app.post("/delete-todo", _AuthenticateToken.default, _deleteTodo.deleteTodo);
app.post("/update-all-todo", _AuthenticateToken.default, _updateTodo.updateAllTodo);
app.post("/delete-completed", _AuthenticateToken.default, _deleteTodo.deleteCompleted);
app.listen(port, function () {
  console.log(`listening to port: ${port}`);
});
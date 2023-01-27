"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _todos = _interopRequireDefault(require("../db/modals/todos"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getTodoList = async function (req, res) {
  try {
    if (req.headers["authorization"]) {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.status(401).send("task failed");
      _jsonwebtoken.default.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) return res.status(401).send("Not authorised");else {
          _todos.default.findOne({
            email: req.body.email
          }).then(function (data) {
            if (data) {
              return res.status(200).send(data);
            }
          }).catch(function (err) {
            console.log(err);
            return res.status(500).send("Could not get list");
          });
        }
      });
    } else {
      return res.sendStatus(403);
    }

    //  await Todos.findOne({email: req.body.email}).then((data)=> {
    //   return res.status(200).send(data);
    // }).catch((err)=> {
    //   console.log(err);
    // })
  } catch (err) {
    console.log("catch err: " + err);
  }
};
var _default = getTodoList;
exports.default = _default;
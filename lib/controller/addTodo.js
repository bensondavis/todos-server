"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _todos = _interopRequireDefault(require("../db/modals/todos"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const addTodo = async function (req, res) {
  // if (req.headers["authorization"])
  try {
    if (req.headers["authorization"]) {
      const authHeader = req?.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.status(401).send("task failed");
      _jsonwebtoken.default.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) return res.status(401).send("Unauthorised");else {
          _todos.default.findOneAndUpdate({
            email: req.body.email
          }, {
            $push: {
              todoList: req.body.content
            }
          }, {
            upsert: true,
            returnDocument: "after"
          }).then(function (data) {
            console.log(data);
            if (data) {
              return res.sendStatus(201);
            }
          }).catch(function (err) {
            console.log({
              err
            });
            return res.status(500).send("Could not add item");
          });
        }
      });
    } else {
      return res.sendStatus(403);
    }

    // Todos.findOneAndUpdate(
    //   { email: req.body.email },
    //   { $push: { todoList: req.body.content } },
    //   { upsert: true, returnDocument: "after" }
    // )
    //   .then((data) => {
    //     console.log(data);
    //     if (data) {
    //       return res.sendStatus(201);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log({ err });
    //     return res.status(500).send("Could not add item");
    //   });
  } catch (err) {
    console.log("catch err: " + err);
    return res.status(500).send("Internal Server Error");
  }
};
var _default = addTodo;
exports.default = _default;
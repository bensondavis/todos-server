"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AuthenticateToken;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function AuthenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(403).send("Forbidden");
  _jsonwebtoken.default.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).send("Session Expired");
    req.user = user.email;
    next();
  });
}
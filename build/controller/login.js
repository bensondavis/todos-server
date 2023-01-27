"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _VerifyToken = _interopRequireDefault(require("../functions/VerifyToken"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _user = require("../db/modals/user");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const login = async function (req, res) {
  try {
    if (req.body.credential) {
      const verificationResponse = await (0, _VerifyToken.default)(req.body.credential);
      if (verificationResponse.error) return res.status(400).send(verificationResponse.error);
      const profile = verificationResponse?.payload;
      const existsInDB = await _user.User.find({
        email: profile.email
      });
      if (existsInDB.length === 0) return res.status(401).send("You are not registered. Please sign up");
      return res.status(201).json({
        message: "Login successfull",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: _jsonwebtoken.default.sign({
            email: profile?.email
          }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TOKEN_EXPIRY
          })
        }
      });
    } else if (req.headers["authorization"]) {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.status(403).send("Forbidden");
      _jsonwebtoken.default.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) return res.status(401).send("Session Expired");
        return res.sendStatus(200);
      });
    }
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
var _default = login;
exports.default = _default;
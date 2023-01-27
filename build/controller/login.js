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
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error
        });
      }
      const profile = verificationResponse?.payload;
      const existsInDB = await _user.User.find({
        email: profile.email
      });
      console.log({
        existsInDB
      });
      if (existsInDB.length === 0) {
        return res.status(401).json({
          message: "You are not registered. Please sign up"
        });
      }
      return res.status(201).json({
        message: "Login was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: _jsonwebtoken.default.sign({
            email: profile?.email
          }, process.env.JWT_SECRET, {
            expiresIn: "1d"
          })
        }
      });
    }
    if (req.headers['authorization']) {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (token == null) return res.status(401).json({
        message: "Login failed!"
      });
      _jsonwebtoken.default.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) return res.sendStatus(403);
        return res.sendStatus(200);
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message || error
    });
  }
};
var _default = login;
exports.default = _default;
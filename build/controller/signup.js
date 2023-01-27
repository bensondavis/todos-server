"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _VerifyToken = _interopRequireDefault(require("../functions/VerifyToken"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _user = require("../db/modals/user");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const signup = async function (req, res) {
  try {
    if (req.body) {
      const verificationResponse = await (0, _VerifyToken.default)(req.body.credential);
      if (verificationResponse.error) return res.status(400).send(verificationResponse.error);
      const profile = verificationResponse?.payload;
      const existsInDB = await _user.User.find({
        email: profile.email
      });
      if (existsInDB.length === 0) {
        await _user.User.create({
          fname: profile?.given_name,
          lname: profile?.family_name,
          picture: profile?.picture,
          email: profile.email
        });
      } else {
        return res.status(409).send("You already signed up");
      }
      res.status(201).json({
        message: "Signup was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile.email,
          token: _jsonwebtoken.default.sign({
            email: profile.email
          }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TOKEN_EXPIRY
          })
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occured. Registration failed."
    });
  }
};
var _default = signup;
exports.default = _default;
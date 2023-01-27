import verifyGoogleToken from "../functions/VerifyToken";
import jwt from "jsonwebtoken";
import { User } from "../db/modals/user";

const login = async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) 
        return res.status(400).send(verificationResponse.error);
      

      const profile = verificationResponse?.payload;

      const existsInDB = await User.find({ email: profile.email });

      if (existsInDB.length === 0)
        return res.status(401).send("You are not registered. Please sign up");

      return res.status(201).json({
        message: "Login successfull",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TOKEN_EXPIRY,
          }),
        },
      });
    } else if (req.headers["authorization"]) {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.status(403).send("Forbidden");

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).send("Session Expired");
        return res.sendStatus(200);
      });
    }
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

export default login;

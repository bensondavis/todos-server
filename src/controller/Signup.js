import verifyGoogleToken from "../functions/VerifyToken";
import jwt from "jsonwebtoken";
import { User } from "../db/modals/user";

const signup = async (req, res) => {
  try {
    if (req.body) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) 
        return res.status(400).send(verificationResponse.error);

      const profile = verificationResponse?.payload;

      const existsInDB = await User.find({ email: profile.email });
      
      if (existsInDB.length === 0) {
        await User.create({
          fname: profile?.given_name,
          lname: profile?.family_name,
          picture: profile?.picture,
          email: profile.email,
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
          token: jwt.sign({ email: profile.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TOKEN_EXPIRY,
          }),
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occured. Registration failed.",
    });
  }
};

export default signup;

import { model, Schema } from "mongoose";

const userSchema = new Schema({
  fname: {type: String},
  lname: {type: String},
  email: {type: String, trim: true, required: true},
  picture: {type: String},
});

const User = model("User", userSchema);

export {User};
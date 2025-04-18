import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "email already exist"],
    required: [true, "email is required"],
  },
  username: {
    type: String,
    required: [true, "username is required"],
  },
  image: {
    type: String,
  },
});

const User = models?.User || model("User", UserSchema);

export default User;

import mongoose, { Schema, SchemaTypes } from "mongoose";
const userSchema = new Schema({
  email: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: { type: SchemaTypes.String, required: true, minLength: 8 },
  name: {
    type: SchemaTypes.String,
    minLength: 2,
    maxLength: 25,
    lowercase: true,
  },
  status: { type: SchemaTypes.String, default: "A" },
  "join-date": { type: SchemaTypes.Date, default: new Date() },
});
export const UserModel = mongoose.model("User", userSchema);

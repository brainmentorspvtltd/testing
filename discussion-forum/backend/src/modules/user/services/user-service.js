import { UserModel } from "../models/user-model.js";
import {
  compareHash,
  passwordHashing,
} from "../../../shared/utils/encryption.js";
import { generateToken } from "../../../shared/utils/token.js";
import mongoose from "mongoose";

export const userService = {
  async register(user) {
    try {
      user.password = passwordHashing(user.password);
      const doc = await UserModel.create(user);
      return doc;
    } catch (err) {
      throw err;
    }
  },
  async login(user) {
    try {
      const doc = await UserModel.findOne({ email: user.email }).lean().exec();
      if (doc && doc.email && compareHash(user.password, doc.password)) {
        const token = generateToken(doc);
        return { user: doc, token: token, success: true };
      } else {
        return { user: null, success: false };
      }
    } catch (err) {
      throw err;
    }
  },
  async getUserById(id) {
    try {
      const obj_id = new mongoose.Types.ObjectId(id);
      const doc = await UserModel.findOne({ _id: obj_id }).exec();

      return { user: doc };
    } catch (err) {
      throw err;
    }
  },
};

import { CommentModel } from "../models/comment-model.js";
import mongoose from "mongoose";
export const commentService = {
  async commentOnPost(comment) {
    try {
      const doc = await CommentModel.create(comment);
      return doc;
    } catch (err) {
      throw err;
    }
  },
  async getAllCommentsofPost(id) {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const docs = await CommentModel.find({ post: objectId });
      return docs;
    } catch (err) {
      throw err;
    }
  },
};

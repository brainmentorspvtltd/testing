import mongoose, { Schema, SchemaTypes } from "mongoose";
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    slug: { type: mongoose.Schema.Types.String, required: true },
  },
  { timestamps: true }
);
export const PostModel = mongoose.model("Post", postSchema);

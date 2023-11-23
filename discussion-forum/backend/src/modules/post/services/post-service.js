import { PostModel } from "../models/post-model.js";

export const postService = {
  async createPost(post) {
    try {
      const doc = await PostModel.create(post);
      return doc;
    } catch (err) {
      throw err;
    }
  },

  async getAllPost() {
    try {
      const allPost = await PostModel.find({}).sort({ createdAt: -1 });

      return allPost;
    } catch (err) {
      throw err;
    }
  },

  async getAPostBySlug(slug) {
    try {
      const post = await PostModel.findOne({ slug: slug }).exec();
      return post;
    } catch (err) {
      throw err;
    }
  },
};

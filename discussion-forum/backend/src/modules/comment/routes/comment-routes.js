import express from "express";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated.js";
import {
  commentOnPost,
  getAllCommentsOfPostBySlug,
} from "../controllers/comment-controller.js";
export const commentRoutes = express.Router();
commentRoutes.post("/comment-on-post", ensureAuthenticated(), commentOnPost);
commentRoutes.get("/get-all-comments", getAllCommentsOfPostBySlug);

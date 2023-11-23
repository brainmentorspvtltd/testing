import express from "express";
import { createPost, getAllPost } from "../controllers/post-controller.js";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated.js";
import { validateRequest } from "../../../shared/middlewares/validator.js";
export const postRoutes = express.Router();
postRoutes.post("/create-post", ensureAuthenticated(), createPost);

postRoutes.get("/get-all-post", getAllPost);

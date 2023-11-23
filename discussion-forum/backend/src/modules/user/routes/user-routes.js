import express from "express";
import {
  getUserById,
  login,
  register,
} from "../controllers/user-controller.js";
import { validateRequest } from "../../../shared/middlewares/validator.js";
import { userSchema } from "../validation/user-schema.js";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated.js";
export const userRoutes = express.Router();
userRoutes.post("/login", validateRequest(userSchema), login);
userRoutes.post("/register", validateRequest(userSchema), register);

userRoutes.get("/user/me", ensureAuthenticated(), getUserById);

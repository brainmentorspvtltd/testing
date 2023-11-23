import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import { userRoutes } from "./modules/user/routes/user-routes.js";
import { ErrorHandler } from "./shared/middlewares/error-handler.js";
import { postRoutes } from "./modules/post/routes/post-routes.js";
import { createConnection } from "./shared/db/connection.js";
import { commentRoutes } from "./modules/comment/routes/comment-routes.js";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/", userRoutes);
app.use("/", postRoutes);
app.use("/", commentRoutes);
app.use(ErrorHandler);
const promise = createConnection();
promise
  .then((data) => {
    console.log(chalk.yellowBright.bold.underline("DB Connection Done..."));
    app.listen(process.env.PORT || 1234, (err) => {
      if (err) {
        console.log(chalk.red.bold("Server Crash "), err);
      } else {
        console.log(chalk.greenBright.bold.underline("Server Up and Running "));
      }
    });
  })
  .catch((err) => {
    console.log(chalk.red.bold("DB Connection Failed... "), err);
  });

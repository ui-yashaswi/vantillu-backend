import express from "express";

import { createUser, getMenuItems, me } from "../controllers/userController.js";
import { userMiddleware } from "../middlewares/authMiddleware.js";
export const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/menu", getMenuItems);
userRouter.use(userMiddleware);
userRouter.get("/", me);

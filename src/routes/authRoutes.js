import express from "express";

import { login, logout } from "../controllers/authController.js";
export const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/logout", logout);

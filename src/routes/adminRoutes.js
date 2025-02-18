import express from "express";
import {
  createAdmin,
  createChef,
  createStaff,
  fetchAllChefs,
  fetchAllStaffs,
  fetchAllUsers,
} from "../controllers/adminController.js";
import { adminMiddleware } from "../middlewares/authMiddleware.js";
import { fetchCaterings, fetchEvents } from "../controllers/homeContoller.js";
export const adminRouter = express.Router();
adminRouter.post("/", createAdmin);
adminRouter.use(adminMiddleware);
adminRouter.get("/users", fetchAllUsers);
adminRouter.get("/staffs", fetchAllStaffs);
adminRouter.get("/chefs", fetchAllChefs);

adminRouter.post("/staff", createStaff);
adminRouter.post("/chef", createChef);
adminRouter.get("/events", fetchEvents);
adminRouter.get("/caterings", fetchCaterings);

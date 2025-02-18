import express from "express";
import {
  addMenuItems,
  deleteMenuItem,
  getMenuItems,
  toggleAvailability,
} from "../controllers/chefController.js";
import { chefMiddleware } from "../middlewares/authMiddleware.js";
export const chefRouter = express.Router();

chefRouter.use(chefMiddleware);

chefRouter.post("/menu", addMenuItems);
chefRouter.get("/menus", getMenuItems);
chefRouter.delete("/menu/:id", deleteMenuItem);

chefRouter.put("/menu/toggleavailbility/:id", toggleAvailability);

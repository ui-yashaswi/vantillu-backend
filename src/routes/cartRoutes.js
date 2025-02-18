import express from "express";
import {
  addToCart,
  decrementItem,
  getCart,
  incrementItem,
  removeFromCart,
} from "../controllers/cartConroller.js";

export const cartRouter = express.Router();

cartRouter.post("/", addToCart);
cartRouter.get("/", getCart);
cartRouter.delete("/item/:id", removeFromCart);
cartRouter.put("/additem/:id", incrementItem);
cartRouter.put("/decitem/:id", decrementItem);

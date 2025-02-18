import express from "express";
import {
  bookCatering,
  bookEvent,
  fetchCaterings,
  fetchEvents,
} from "../controllers/homeContoller.js";

export const homeRouter = express.Router();

homeRouter.post("/bookevent", bookEvent);
homeRouter.post("/bookcatering", bookCatering);

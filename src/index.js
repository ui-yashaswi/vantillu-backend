import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import cors from "cors";
import { connectDB } from "./db/db.js";
import bodyParser from "body-parser";
import {
  adminRouter,
  menuRouter,
  cartRouter,
  chefRouter,
  staffRouter,
  paymentRouter,
  userRouter,
} from "./routes/route.js";
import { authRouter } from "./routes/authRoutes.js";
import { homeRouter } from "./routes/homeRoutes.js";
export const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://brahmanvantilla2.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Required for cookies
  })
);

app.use(bodyParser({ extended: true }));
app.use(express.json());
app.use(cookieParser());
dotenv.config({ path: "./src/.env" });

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

export const upload = multer({
  dest: "uploads",
});

connectDB();

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/home", homeRouter);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/chef", chefRouter);
app.use("/api/v1/staff", staffRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/user/cart", cartRouter);
app.use("/api/v1/auth", authRouter);

app.listen(4000, () => console.log("port is running on 4k"));

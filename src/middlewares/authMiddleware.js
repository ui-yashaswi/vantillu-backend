import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";

export const adminMiddleware = async (req, res, next) => {
  const token = req.headers.authorization || req.cookies.token;
  const data = await jwt.verify(token, process.env.JWT_SECRET);

  if (!data || data?.role !== "admin") {
    return res.json({
      error: "session expired please login again",
    });
  }

  const admin = await UserModel.findById(data.id);

  if (admin.tokenExpiry > Date.now() + 6 * 24 * 60 * 60 * 1000) {
    return res.json({
      error: "token expired please login again",
    });
  }

  req.id = data.id;
  req.role = data.role;
  next();
};
export const staffMiddleware = async (req, res, next) => {
  const token = req.headers.authorization || req.cookies.token;
  const data = await jwt.verify(token, process.env.JWT_SECRET);

  if (!data || data?.role !== "staff") {
    return res.json({
      error: "session expired please login again",
    });
  }

  const admin = await UserModel.findById(data.id);

  if (admin.tokenExpiry > Date.now() + 6 * 24 * 60 * 60 * 1000) {
    return res.json({
      error: "token expired please login again",
    });
  }

  req.id = data.id;
  req.role = data.role;
  next();
};

export const userMiddleware = async (req, res, next) => {
  const token = req.headers.authorization || req.cookies.token;

  if (!token) {
    res.json({
      error: "unAuthorized access please login again !",
    });
  }
  const data = await jwt.verify(token, process.env.JWT_SECRET);

  if (!data || data?.role !== "user") {
    return res.json({
      error: "session expired please login again",
    });
  }

  const admin = await UserModel.findById(data.id);

  if (admin.tokenExpiry > Date.now() + 6 * 24 * 60 * 60 * 1000) {
    return res.json({
      error: "token expired please login again",
    });
  }

  req.id = data.id;
  req.role = data.role;
  next();
};
export const chefMiddleware = async (req, res, next) => {
  const token = req.headers.authorization || req.cookies.token;
  const data = await jwt.verify(token, process.env.JWT_SECRET);

  if (!data || data?.role !== "chef") {
    return res.json({
      error: "session expired please login again",
    });
  }

  const admin = await UserModel.findById(data.id);

  if (admin.tokenExpiry > Date.now() + 6 * 24 * 60 * 60 * 1000) {
    return res.json({
      error: "token expired please login again",
    });
  }

  req.id = data.id;
  req.role = data.role;
  next();
};

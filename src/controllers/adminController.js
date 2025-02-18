import { UserModel } from "../models/user.js";
import { validateUser } from "../validations/userValidations.js";
import bcrypt from "bcryptjs";

export const fetchAllUsers = async (req, res) => {
  const role = "user";
  const users = await UserModel.find({ role }).select("-password");
  return res.status(200).json({
    data: users,
    message: "users fetched successfully",
  });
};

export const fetchAllStaffs = async (req, res) => {
  const role = "staff";
  const users = await UserModel.find({ role }).select("-password");
  return res.status(200).json({
    data: users,
    message: "users fetched successfully",
  });
};
export const fetchAllChefs = async (req, res) => {
  const role = "chef";
  const users = await UserModel.find({ role }).select("-password");
  return res.status(200).json({
    data: users,
    message: "users fetched successfully",
  });
};
export const createStaff = async (req, res) => {
  const { name, email, password } = req.body;
  const role = "staff";
  const { success, data } = validateUser({ name, email, password, role });
  if (success) {
    const alreadyPresent = await UserModel.findOne({ email: data.email });
    if (alreadyPresent) {
      return res.status(400).json({
        error: "staff already exist",
      });
    }
    const encPass = await bcrypt.hash(data.password, 10);
    const user = await UserModel.create({ ...data, password: encPass });
    const userObj = user.toObject();
    delete userObj.password;
    return res.status(201).json({
      data: userObj,
      message: "staff created successfully",
    });
  }
};

export const createChef = async (req, res) => {
  const { name, email, password } = req.body;
  const role = "chef";
  const { success, data } = validateUser({ name, email, password, role });
  if (success) {
    const alreadyPresent = await UserModel.findOne({ email: data.email });
    if (alreadyPresent) {
      return res.status(400).json({
        error: "chef already exist",
      });
    }
    const encPass = await bcrypt.hash(data.password, 10);
    const user = await UserModel.create({ ...data, password: encPass });
    const userObj = user.toObject();
    delete userObj.password;
    return res.status(201).json({
      data: userObj,
      message: "chef created successfully",
    });
  }
};

export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const role = "admin";
  const { success, data } = validateUser({ name, email, password, role });
  if (success) {
    const alreadyPresent = await UserModel.findOne({ email: data.email });
    if (alreadyPresent) {
      return res.status(400).json({
        error: "admin already exist",
      });
    }
    const encPass = await bcrypt.hash(data.password, 10);
    const user = await UserModel.create({ ...data, password: encPass });
    const userObj = user.toObject();
    delete userObj.password;
    return res.status(201).json({
      data: userObj,
      message: "admin created successfully",
    });
  }
};

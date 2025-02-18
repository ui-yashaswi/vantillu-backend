import { validateUser } from "../validations/userValidations.js";
import { UserModel } from "../models/user.js";
import bcrypt from "bcryptjs";
import { MenuModel } from "../models/menu.js";
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const role = "user";
  const { success, data } = validateUser({ name, email, password, role });
  if (data) {
    const encPass = await bcrypt.hash(data.password, 10);

    const alreadyPresent = await UserModel.findOne({ email: data.email });
    if (alreadyPresent) {
      return res.status(400).json({
        error: "user already exist",
      });
    }
    const user = await UserModel.create({ ...data, password: encPass });
    const userObj = user.toObject();
    delete userObj.password;
    return res.status(201).json({
      data: userObj,
      message: "user created successfully",
    });
  }
};

export const getMenuItems = async (req, res) => {
  const items = await MenuModel.find({ availability: "available" });
  return res.status(200).json({
    data: items,
    message: "items fetched successfully",
  });
};

export const me = async (req, res) => {
  const { id } = req;
  const items = await UserModel.findById(id);
  return res.status(200).json({
    data: items,
    message: "items fetched successfully",
  });
};

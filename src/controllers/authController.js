import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validateAuth } from "../validations/authValidations.js";
import { UserModel } from "../models/user.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, success } = validateAuth({ email, password });

  if (success) {
    const user = await UserModel.findOne({ email: data.email }).select(
      "+password"
    );

    if (!user) {
      return res.status(401).json({
        error: "invalid credentials",
      });
    }

    const checkPass = await bcrypt.compare(data.password, user.password);
    if (!checkPass) {
      return res.status(401).json({
        error: "invalid credentials",
      });
    }
    const token = await jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "6d" }
    );
    const newUser = user.toObject();
    delete newUser.password;
    return res
      .cookie("token", token, {
        secure: true,
        http: true,
        sameSite: true,
      })
      .status(200)
      .json({ message: user.role + " logged in successFully", data: newUser });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.json({ message: "Logged out successfully" });
};

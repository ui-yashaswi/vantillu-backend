import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["staff", "admin", "chef", "user"],
      required: true,
      default: "user",
    },

    token: {
      type: String,
      default: null,
    },
    tokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", UserSchema);

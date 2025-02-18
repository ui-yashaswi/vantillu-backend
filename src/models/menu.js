import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["starters", "maincourse", "drinks", "desserts"],
      required: true,
    },
    image: { type: String },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    availability: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

export const MenuModel =
  mongoose.models.menu || mongoose.model("menu", MenuSchema);

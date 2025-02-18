import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  }, // For logged-in users
  sessionId: {
    type: String,
    required: function () {
      return !this.userId;
    },
  }, // For guests
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "menu",
        required: true,
      }, // Linked to Menu Schema
      name: { type: String, required: true }, // Item Name
      category: { type: String, required: true }, // Category (Starters, Main Course, etc.)
      quantity: { type: Number, required: true, min: 1 }, // Quantity
      customizations: { type: String, default: "" }, // Custom Requests
      price: { type: Number, required: true }, // Item Price
    },
  ],
  subtotal: { type: Number, required: true, default: 0 }, // Subtotal Price
  tax: { type: Number, default: 0 }, // Tax (if applicable)
  totalAmount: { type: Number, required: true, default: 0 }, // Total Price (Subtotal + Tax)
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

export const CartModel = mongoose.model("cart", cartSchema);

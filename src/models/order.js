import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true, required: true },
  orderType: { type: String, enum: ["Dine-in", "Takeout"], required: true },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "menu",
        required: true,
      }, // Link to Menu
      name: { type: String, required: true },
      category: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 }, // Quantity
      customizations: { type: String, default: "" }, // Custom Requests
      price: { type: Number, required: true }, // Item Price
    },
  ],
  tableNumber: {
    type: Number,
    required: function () {
      return this.orderType === "Dine-in";
    },
  }, // Table Number (only for Dine-in)
  takeawayTag: {
    type: String,
    required: function () {
      return this.orderType === "Takeout";
    },
  }, // Takeaway Tag (only for Takeout)
  subtotal: { type: Number, required: true }, // Subtotal Price
  tax: { type: Number, default: 0 }, // Tax (if applicable)
  totalAmount: { type: Number, required: true }, // Total Price (Subtotal + Tax)
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Ready", "Completed", "Delivered"],
    default: "Pending",
  }, // Order Status
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

export const OrderModel = mongoose.model("Order", orderSchema);

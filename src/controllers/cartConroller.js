import { CartModel } from "../models/cart.js";
import { MenuModel } from "../models/menu.js";

// Utility to calculate subtotal, tax, and total
const calculateCartTotals = (cart) => {
  cart.subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  cart.tax = cart.subtotal * 0.05; // 5% tax example
  cart.totalAmount = cart.subtotal + cart.tax;
  return cart;
};

// Add to Cart
export const addToCart = async (req, res) => {
  try {
    const {
      userId,
      sessionId,
      itemId,
      quantity = 1,
      customizations = "",
    } = req.body;
    const item = await MenuModel.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const filter = userId ? { userId } : { sessionId };
    let cart = await CartModel.findOne(filter);

    if (!cart) {
      cart = new CartModel({ userId, sessionId, items: [] });
    }

    const existingItem = cart.items.find((i) => i.itemId.toString() === itemId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        itemId,
        name: item.name,
        category: item.category,
        quantity,
        customizations,
        price: item.price,
      });
    }

    calculateCartTotals(cart);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from Cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, sessionId, itemId } = req.body;
    const filter = userId ? { userId } : { sessionId };
    let cart = await CartModel.findOne(filter);

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.itemId.toString() !== itemId);

    calculateCartTotals(cart);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Increment Item Quantity
export const incrementItem = async (req, res) => {
  try {
    const { userId, sessionId, itemId } = req.body;
    const filter = userId ? { userId } : { sessionId };
    let cart = await CartModel.findOne(filter);

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.itemId.toString() === itemId);
    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });

    item.quantity += 1;

    calculateCartTotals(cart);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Decrement Item Quantity
export const decrementItem = async (req, res) => {
  try {
    const { userId, sessionId, itemId } = req.body;
    const filter = userId ? { userId } : { sessionId };
    let cart = await CartModel.findOne(filter);

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (i) => i.itemId.toString() === itemId
    );
    if (itemIndex === -1)
      return res.status(404).json({ message: "Item not found in cart" });

    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    calculateCartTotals(cart);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get cart by userId or sessionId
 */
export const getCart = async (req, res) => {
  try {
    const { userId, sessionId } = req.query;

    if (!userId && !sessionId) {
      return res
        .status(400)
        .json({ message: "userId or sessionId is required" });
    }

    const cart = await CartModel.findOne({ $or: [{ userId }, { sessionId }] });

    if (!cart) {
      return res.status(404).json({ error: "Cart is empty" });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

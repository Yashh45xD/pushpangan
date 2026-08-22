import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { sendResponse } from "../utils/sendResponse.js";

// Helper function to recalculate cart subtotal, discount, GST, shipping, and grand total
const recalculateCart = (cart) => {
  let subtotal = 0;
  let discount = 0;

  cart.items.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  const gst = Math.round(subtotal * 0.18); // 18% GST for flowers & gifts
  const shipping = subtotal > 999 || cart.items.length === 0 ? 0 : 99; // Free shipping over ₹999
  const grandTotal = Math.max(0, subtotal - discount + gst + shipping);

  cart.subtotal = subtotal;
  cart.discount = discount;
  cart.gst = gst;
  cart.shipping = shipping;
  cart.grandTotal = grandTotal;

  return cart;
};

export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate("items.product", "name images price discount stock unit color");

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    cart = recalculateCart(cart);
    await cart.save();

    return sendResponse(res, 200, true, "Cart retrieved", cart);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return sendResponse(res, 404, false, "Product not found");
    }

    if (product.stock < quantity) {
      return sendResponse(res, 400, false, "Requested quantity exceeds available stock");
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    const itemPrice = product.discount > 0 ? Math.round(product.price * (1 - product.discount / 100)) : product.price;

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += Number(quantity);
      cart.items[itemIndex].price = itemPrice;
    } else {
      cart.items.push({ product: productId, quantity: Number(quantity), price: itemPrice });
    }

    cart = recalculateCart(cart);
    await cart.save();
    await cart.populate("items.product", "name images price discount stock unit color");

    return sendResponse(res, 200, true, "Product added to cart", cart);
  } catch (error) {
    next(error);
  }
};

export const updateQuantity = async (req, res, next) => {
  try {
    const { productId, action } = req.body; // action: 'increase' or 'decrease'
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return sendResponse(res, 404, false, "Cart not found");
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex === -1) {
      return sendResponse(res, 404, false, "Item not found in cart");
    }

    if (action === "increase") {
      const product = await Product.findById(productId);
      if (product.stock <= cart.items[itemIndex].quantity) {
        return sendResponse(res, 400, false, "Stock limit reached");
      }
      cart.items[itemIndex].quantity += 1;
    } else if (action === "decrease") {
      cart.items[itemIndex].quantity -= 1;
      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
    }

    cart = recalculateCart(cart);
    await cart.save();
    await cart.populate("items.product", "name images price discount stock unit color");

    return sendResponse(res, 200, true, "Cart updated", cart);
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return sendResponse(res, 404, false, "Cart not found");
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    cart = recalculateCart(cart);
    await cart.save();
    await cart.populate("items.product", "name images price discount stock unit color");

    return sendResponse(res, 200, true, "Product removed from cart", cart);
  } catch (error) {
    next(error);
  }
};

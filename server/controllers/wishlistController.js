import Wishlist from "../models/Wishlist.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { sendResponse } from "../utils/sendResponse.js";

export const getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products", "name images price discount stock color rating");

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }

    return sendResponse(res, 200, true, "Wishlist retrieved", wishlist);
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, products: [] });
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    await wishlist.populate("products", "name images price discount stock color rating");
    return sendResponse(res, 200, true, "Added to wishlist", wishlist);
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (wishlist) {
      wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
      await wishlist.save();
    }

    await wishlist.populate("products", "name images price discount stock color rating");
    return sendResponse(res, 200, true, "Removed from wishlist", wishlist);
  } catch (error) {
    next(error);
  }
};

export const moveWishlistToCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return sendResponse(res, 404, false, "Product not found");
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (wishlist) {
      wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
      await wishlist.save();
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    const itemPrice = product.discount > 0 ? Math.round(product.price * (1 - product.discount / 100)) : product.price;

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ product: productId, quantity: 1, price: itemPrice });
    }

    await cart.save();

    return sendResponse(res, 200, true, "Moved product from wishlist to cart", { wishlist, cart });
  } catch (error) {
    next(error);
  }
};

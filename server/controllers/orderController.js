import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Invoice from "../models/Invoice.js";
import mongoose from "mongoose";
import { sendResponse } from "../utils/sendResponse.js";
import { sendOrderNotifications } from "../services/notificationService.js";

// @desc    Place Order (Customer)
// @route   POST /api/orders
export const placeOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, paymentResult, discountAmount = 0 } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return sendResponse(res, 400, false, "No order items provided");
    }

    let subtotal = 0;
    const items = [];

    for (let item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return sendResponse(res, 404, false, `Product ${item.name} not found`);
      }
      if (product.stock < item.quantity) {
        return sendResponse(res, 400, false, `Insufficient stock for product ${product.name}`);
      }

      // Deduct Stock
      product.stock -= item.quantity;
      await product.save();

      const price = product.discount > 0 ? Math.round(product.price * (1 - product.discount / 100)) : product.price;
      subtotal += price * item.quantity;

      items.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        image: product.images[0],
        price,
      });
    }

    const tax = Math.round(subtotal * 0.18);
    const shippingPrice = subtotal > 999 ? 0 : 99;
    const grandTotal = Math.max(0, subtotal - discountAmount + tax + shippingPrice);

    const order = await Order.create({
      user: req.user._id,
      orderItems: items,
      shippingAddress,
      paymentMethod,
      paymentResult,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
      orderStatus: "Pending",
      subtotal,
      tax,
      shippingPrice,
      discountAmount,
      grandTotal,
      invoiceUrl: `https://pushpangan-invoices.s3.amazonaws.com/INV-${Date.now()}.pdf`,
    });

    // Clear User Cart after order placement
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [], subtotal: 0, discount: 0, gst: 0, shipping: 0, grandTotal: 0 });

    // Link Order to User
    await User.findByIdAndUpdate(req.user._id, { $push: { orders: order._id } });

    // 🔔 Send notifications to customer + admin (email & WhatsApp) — non-blocking
    sendOrderNotifications(order, req.user).catch((err) =>
      console.error("Notification dispatch error:", err.message)
    );

    return sendResponse(res, 201, true, "Order placed successfully", order);
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return sendResponse(res, 200, true, "User orders retrieved", orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Get order details by ID
// @route   GET /api/orders/:id
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email phone");

    if (!order) {
      return sendResponse(res, 404, false, "Order not found");
    }

    // Verify customer owns the order or is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return sendResponse(res, 403, false, "Not authorized to view this order");
    }

    return sendResponse(res, 200, true, "Order details retrieved", order);
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel Order (Customer)
// @route   PUT /api/orders/:id/cancel
export const cancelOrder = async (req, res, next) => {
  try {
    const { cancelReason } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return sendResponse(res, 404, false, "Order not found");
    }

    if (order.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return sendResponse(res, 403, false, "Not authorized to cancel this order");
    }

    if (["Shipped", "Out for Delivery", "Delivered", "Cancelled"].includes(order.orderStatus)) {
      return sendResponse(res, 400, false, `Order cannot be cancelled at stage: ${order.orderStatus}`);
    }

    order.orderStatus = "Cancelled";
    order.cancelledAt = new Date();
    order.cancelReason = cancelReason || "Cancelled by customer";
    await order.save();

    // Restock Products
    for (let item of order.orderItems) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } });
    }

    return sendResponse(res, 200, true, "Order cancelled successfully", order);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("user", "name email phone").sort({ createdAt: -1 });
    return sendResponse(res, 200, true, "All orders retrieved", orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Update Order Status (Admin)
// Statuses: Pending, Confirmed, Packed, Shipped, Out for Delivery, Delivered, Cancelled
// @route   PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return sendResponse(res, 404, false, "Order not found");
    }

    if (orderStatus) {
      order.orderStatus = orderStatus;
      if (orderStatus === "Delivered") {
        order.deliveredAt = new Date();
        order.paymentStatus = "Paid";
      }
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();
    return sendResponse(res, 200, true, "Order status updated", order);
  } catch (error) {
    next(error);
  }
};

// @desc    Reorder (add previous items back to cart)
// @route   POST /api/orders/:id/reorder
export const reorder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return sendResponse(res, 404, false, "Order not found");
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    for (let item of order.orderItems) {
      const product = await Product.findById(item.product);
      if (product && product.stock > 0) {
        const itemIndex = cart.items.findIndex((ci) => ci.product.toString() === item.product.toString());
        const quantityToAdd = Math.min(item.quantity, product.stock);
        const itemPrice = product.discount > 0 ? Math.round(product.price * (1 - product.discount / 100)) : product.price;

        if (itemIndex > -1) {
          cart.items[itemIndex].quantity = Math.min(cart.items[itemIndex].quantity + quantityToAdd, product.stock);
          cart.items[itemIndex].price = itemPrice;
        } else {
          cart.items.push({ product: item.product, quantity: quantityToAdd, price: itemPrice });
        }
      }
    }

    // Recalculate cart totals
    let subtotal = 0;
    cart.items.forEach((ci) => {
      subtotal += ci.price * ci.quantity;
    });
    cart.subtotal = subtotal;
    cart.gst = Math.round(subtotal * 0.18);
    cart.shipping = subtotal > 999 || cart.items.length === 0 ? 0 : 99;
    cart.grandTotal = cart.subtotal + cart.gst + cart.shipping;

    await cart.save();
    return sendResponse(res, 200, true, "Items added back to cart for reordering", cart);
  } catch (error) {
    next(error);
  }
};

// @desc    Rate and Review Order item
// @route   PUT /api/orders/:id/rate
export const rateOrder = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) {
      return sendResponse(res, 404, false, "Order not found");
    }

    const Review = mongoose.model("Review");
    let review = await Review.findOne({ user: req.user._id, product: productId });
    if (review) {
      review.rating = rating;
      review.comment = comment;
      await review.save();
    } else {
      review = await Review.create({
        user: req.user._id,
        product: productId,
        rating,
        comment,
        isVerifiedBuyer: true
      });
      await Product.findByIdAndUpdate(productId, { $push: { reviews: review._id } });
    }

    // Recalculate product rating
    const reviews = await Review.find({ product: productId });
    const numReviews = reviews.length;
    const avgRating = numReviews > 0 ? reviews.reduce((acc, item) => item.rating + acc, 0) / numReviews : 0;
    await Product.findByIdAndUpdate(productId, {
      rating: Math.round(avgRating * 10) / 10,
      numReviews
    });

    return sendResponse(res, 200, true, "Product rated successfully", review);
  } catch (error) {
    next(error);
  }
};

// @desc    Search Orders
// @route   GET /api/orders/search
export const searchOrders = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      return sendResponse(res, 400, false, "Search query is required");
    }

    const orders = await Order.find({
      user: req.user._id,
      $or: [
        { _id: mongoose.isValidObjectId(query) ? query : undefined },
        { "orderItems.name": { $regex: query, $options: "i" } },
        { orderStatus: { $regex: query, $options: "i" } },
        { paymentMethod: { $regex: query, $options: "i" } }
      ].filter(Boolean)
    });

    return sendResponse(res, 200, true, "Search results retrieved", orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Filter Orders
// @route   GET /api/orders/filter
export const filterOrders = async (req, res, next) => {
  try {
    const { timeframe, status } = req.query;
    let query = { user: req.user._id };

    if (status && status !== "All") {
      query.orderStatus = status;
    }

    if (timeframe && timeframe !== "All Orders") {
      const now = new Date();
      if (timeframe === "Last 30 Days") {
        query.createdAt = { $gte: new Date(now.setDate(now.getDate() - 30)) };
      } else if (timeframe === "Last 3 Months") {
        query.createdAt = { $gte: new Date(now.setMonth(now.getMonth() - 3)) };
      } else if (timeframe === "Last 6 Months") {
        query.createdAt = { $gte: new Date(now.setMonth(now.getMonth() - 6)) };
      } else if (timeframe === "Last Year") {
        query.createdAt = { $gte: new Date(now.setFullYear(now.getFullYear() - 1)) };
      }
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
    return sendResponse(res, 200, true, "Filtered orders retrieved", orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Get Invoice Detail
// @route   GET /api/orders/invoice/:id
export const getInvoice = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email phone");
    if (!order) {
      return sendResponse(res, 404, false, "Order not found");
    }

    let invoice = await Invoice.findOne({ order: order._id });
    if (!invoice) {
      const invoiceNumber = `INV-${order._id.toString().slice(-8).toUpperCase()}`;
      invoice = await Invoice.create({
        order: order._id,
        invoiceNumber,
        pdfUrl: order.invoiceUrl || `https://pushpangan-invoices.s3.amazonaws.com/${invoiceNumber}.pdf`,
        totalAmount: order.grandTotal
      });
    }

    return sendResponse(res, 200, true, "Invoice details retrieved", { invoice, order });
  } catch (error) {
    next(error);
  }
};


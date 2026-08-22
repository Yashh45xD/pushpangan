import express from "express";
import { getDashboardStats } from "../controllers/adminController.js";
import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/role.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { sendResponse } from "../utils/sendResponse.js";

const router = express.Router();

// All admin routes are protected + admin-only
router.use(protect, adminOnly);

// Dashboard statistics
router.get("/dashboard", getDashboardStats);

// ─── User Management ──────────────────────────────────────────────────────────
// GET all customers
router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find({ role: "customer" }).sort({ createdAt: -1 });
    return sendResponse(res, 200, true, "All users fetched", users);
  } catch (e) { next(e); }
});

// GET single user
router.get("/users/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("orders").populate("addresses");
    if (!user) return sendResponse(res, 404, false, "User not found");
    return sendResponse(res, 200, true, "User found", user);
  } catch (e) { next(e); }
});

// DELETE user
router.delete("/users/:id", async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return sendResponse(res, 200, true, "User deleted");
  } catch (e) { next(e); }
});

// ─── Order Management ─────────────────────────────────────────────────────────
// GET all orders (admin view with user info)
router.get("/orders", async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });
    return sendResponse(res, 200, true, "All orders fetched", orders);
  } catch (e) { next(e); }
});

// ─── Analytics & Reports ──────────────────────────────────────────────────────
// Low stock alert: products with stock <= 5
router.get("/low-stock", async (req, res, next) => {
  try {
    const lowStock = await Product.find({ stock: { $lte: 5 } })
      .select("name stock price images category")
      .populate("category", "name");
    return sendResponse(res, 200, true, "Low stock products", lowStock);
  } catch (e) { next(e); }
});

// Sales report: total revenue by payment method
router.get("/sales-report", async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const matchStage = { orderStatus: { $ne: "Cancelled" } };
    if (startDate && endDate) {
      matchStage.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const salesByMethod = await Order.aggregate([
      { $match: matchStage },
      { $group: { _id: "$paymentMethod", revenue: { $sum: "$grandTotal" }, count: { $sum: 1 } } },
    ]);

    const dailySales = await Order.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$grandTotal" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const topProducts = await Order.aggregate([
      { $match: matchStage },
      { $unwind: "$orderItems" },
      {
        $group: {
          _id: "$orderItems.product",
          name: { $first: "$orderItems.name" },
          totalSold: { $sum: "$orderItems.quantity" },
          totalRevenue: { $sum: { $multiply: ["$orderItems.price", "$orderItems.quantity"] } },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 10 },
    ]);

    return sendResponse(res, 200, true, "Sales report generated", {
      salesByMethod,
      dailySales,
      topProducts,
    });
  } catch (e) { next(e); }
});

export default router;

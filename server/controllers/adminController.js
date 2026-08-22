import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { sendResponse } from "../utils/sendResponse.js";

// @desc    Get Admin Dashboard Analytics
// @route   GET /api/admin/dashboard
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ role: "customer" });
    const totalOrders = await Order.countDocuments();
    
    // Revenue calculations
    const revenueData = await Order.aggregate([
      { $match: { orderStatus: { $ne: "Cancelled" } } },
      { $group: { _id: null, totalRevenue: { $sum: "$grandTotal" } } },
    ]);
    const revenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    // Today's stats
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const todayOrders = await Order.countDocuments({ createdAt: { $gte: startOfToday } });
    const todayRevenueData = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfToday }, orderStatus: { $ne: "Cancelled" } } },
      { $group: { _id: null, todayRevenue: { $sum: "$grandTotal" } } },
    ]);
    const todayRevenue = todayRevenueData.length > 0 ? todayRevenueData[0].todayRevenue : 0;

    // Products sold & low stock items
    const productsSoldData = await Order.aggregate([
      { $unwind: "$orderItems" },
      { $group: { _id: null, totalSold: { $sum: "$orderItems.quantity" } } },
    ]);
    const productsSold = productsSoldData.length > 0 ? productsSoldData[0].totalSold : 0;

    const outOfStockProducts = await Product.find({ stock: { $lte: 5 } }).select("name stock price images");
    const recentOrders = await Order.find().populate("user", "name email").sort({ createdAt: -1 }).limit(5);

    // Top selling flowers
    const topSelling = await Product.find({ bestSeller: true }).limit(5);

    // Monthly Revenue Graph Data
    const monthlyRevenue = await Order.aggregate([
      { $match: { orderStatus: { $ne: "Cancelled" } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$grandTotal" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    return sendResponse(res, 200, true, "Dashboard analytics fetched successfully", {
      totalUsers,
      totalOrders,
      revenue,
      todayOrders,
      todayRevenue,
      productsSold,
      outOfStockProducts,
      recentOrders,
      topSellingFlowers: topSelling,
      monthlyRevenue,
    });
  } catch (error) {
    next(error);
  }
};

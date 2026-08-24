import express from "express";
import { protect } from "../middleware/auth.js";
import { User } from "../models/User.js";
import { Address } from "../models/Address.js";
import { Order } from "../models/Order.js";
import { RewardPoints } from "../models/RewardPoints.js";

const router = express.Router();

// ─── GET Full Profile ─────────────────────────────────────────────────────────
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const addresses = await Address.find({ user: req.user.id }).sort({ isDefault: -1 });
    const rewards = await RewardPoints.findOne({ user: req.user.id }) || { available: 250, lifetime: 1200, level: "Gold" };
    const orderCount = await Order.countDocuments({ user: req.user.id });
    const pendingCount = await Order.countDocuments({ user: req.user.id, orderStatus: "Pending" });
    const deliveredCount = await Order.countDocuments({ user: req.user.id, orderStatus: "Delivered" });
    const cancelledCount = await Order.countDocuments({ user: req.user.id, orderStatus: "Cancelled" });

    res.json({
      success: true,
      user,
      addresses,
      rewards,
      summary: { total: orderCount, pending: pendingCount, delivered: deliveredCount, cancelled: cancelledCount },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── UPDATE Profile ───────────────────────────────────────────────────────────
router.put("/profile", protect, async (req, res) => {
  try {
    const { firstName, lastName, gender, birthday, phone, alternatePhone, avatar } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { firstName, lastName, gender, birthday, phone, alternatePhone, avatar } },
      { new: true, runValidators: true }
    ).select("-password");
    res.json({ success: true, user: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ─── CHANGE Password ──────────────────────────────────────────────────────────
router.put("/password", protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) return res.status(400).json({ success: false, message: "Current password is incorrect." });
    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: "Password changed successfully." });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ─── Addresses ────────────────────────────────────────────────────────────────
router.get("/addresses", protect, async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id }).sort({ isDefault: -1 });
    res.json({ success: true, addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/addresses", protect, async (req, res) => {
  try {
    // If marking as default, unset others
    if (req.body.isDefault) {
      await Address.updateMany({ user: req.user.id }, { isDefault: false });
    }
    const address = await Address.create({ ...req.body, user: req.user.id });
    res.status(201).json({ success: true, address });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/addresses/:id", protect, async (req, res) => {
  try {
    if (req.body.isDefault) {
      await Address.updateMany({ user: req.user.id }, { isDefault: false });
    }
    const address = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!address) return res.status(404).json({ success: false, message: "Address not found" });
    res.json({ success: true, address });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete("/addresses/:id", protect, async (req, res) => {
  try {
    await Address.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ success: true, message: "Address deleted." });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ─── Orders ───────────────────────────────────────────────────────────────────
router.get("/orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("orderItems.product", "name mainImage");
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── Rewards ──────────────────────────────────────────────────────────────────
router.get("/rewards", protect, async (req, res) => {
  try {
    let rewards = await RewardPoints.findOne({ user: req.user.id });
    if (!rewards) {
      rewards = await RewardPoints.create({ user: req.user.id, available: 250, lifetime: 1200, level: "Gold" });
    }
    res.json({ success: true, rewards });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── Notifications ────────────────────────────────────────────────────────────
router.get("/notifications", protect, async (req, res) => {
  res.json({
    success: true,
    notifications: [
      { _id: "n1", title: "🌸 Weekend Marigold Sale!", message: "Get 15% off on all Marigold bundles this weekend.", type: "offer", read: false, createdAt: new Date() },
      { _id: "n2", title: "📦 Order Shipped!", message: "Your Yellow Dutch Marigold order is out for delivery.", type: "order", read: false, createdAt: new Date() },
      { _id: "n3", title: "🎉 Diwali Festival Offer!", message: "Flat ₹100 off on orders above ₹500 using code DIWALI100.", type: "offer", read: true, createdAt: new Date(Date.now() - 86400000) },
    ],
  });
});

// ─── DELETE Account ───────────────────────────────────────────────────────────
router.delete("/account", protect, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    await Address.deleteMany({ user: req.user.id });
    res.json({ success: true, message: "Account deleted successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

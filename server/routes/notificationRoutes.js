import express from "express";
import { Notification } from "../models/Notification.js";
import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/role.js";
import { sendResponse } from "../utils/sendResponse.js";

const router = express.Router();

router.use(protect);

// GET all notifications for logged in user
router.get("/", async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50);
    return sendResponse(res, 200, true, "Notifications fetched", notifications);
  } catch (e) { next(e); }
});

// Mark single notification as read
router.put("/:id/read", async (req, res, next) => {
  try {
    const n = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isRead: true },
      { new: true }
    );
    return sendResponse(res, 200, true, "Notification marked as read", n);
  } catch (e) { next(e); }
});

// Mark all as read
router.put("/read-all", async (req, res, next) => {
  try {
    await Notification.updateMany({ user: req.user._id }, { isRead: true });
    return sendResponse(res, 200, true, "All notifications marked as read");
  } catch (e) { next(e); }
});

// Admin: send notification to a user
router.post("/send", adminOnly, async (req, res, next) => {
  try {
    const { userId, title, message, type, link } = req.body;
    const n = await Notification.create({ user: userId, title, message, type, link });
    return sendResponse(res, 201, true, "Notification sent", n);
  } catch (e) { next(e); }
});

export default router;

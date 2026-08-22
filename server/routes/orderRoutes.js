import express from "express";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  reorder,
  rateOrder,
  searchOrders,
  filterOrders,
  getInvoice,
} from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/role.js";

const router = express.Router();

router.use(protect);

// Post / Get all orders or place order
router.post("/", placeOrder);

// Search & Filter (define before parameter routes to prevent conflict with /:id)
router.get("/search", searchOrders);
router.get("/filter", filterOrders);
router.get("/myorders", getMyOrders);
router.get("/invoice/:id", getInvoice);

// Single order operations
router.get("/:id", getOrderById);
router.put("/:id/cancel", cancelOrder);
router.post("/:id/reorder", reorder);
router.put("/:id/rate", rateOrder);

// Admin Order Endpoints
router.get("/", adminOnly, getAllOrders);
router.put("/:id/status", adminOnly, updateOrderStatus);

export default router;


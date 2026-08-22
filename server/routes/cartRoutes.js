import express from "express";
import { getCart, addToCart, updateQuantity, removeFromCart } from "../controllers/cartController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get("/", getCart);
router.post("/add", addToCart);
router.put("/quantity", updateQuantity);
router.delete("/remove", removeFromCart);

export default router;

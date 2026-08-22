import express from "express";
import { getWishlist, addToWishlist, removeFromWishlist, moveWishlistToCart } from "../controllers/wishlistController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get("/", getWishlist);
router.post("/add", addToWishlist);
router.delete("/remove", removeFromWishlist);
router.post("/move-to-cart", moveWishlistToCart);

export default router;

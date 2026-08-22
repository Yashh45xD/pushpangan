import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSpecialProducts,
} from "../controllers/productController.js";
import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/role.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/special/featured", getSpecialProducts);
router.get("/:id", getProductById);

// Admin product endpoints
router.post("/", protect, adminOnly, upload.array("images", 5), createProduct);
router.put("/:id", protect, adminOnly, upload.array("images", 5), updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;

import express from "express";
import { addReview, updateReview, deleteReview } from "../controllers/reviewController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.post("/", addReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;

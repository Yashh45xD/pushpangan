import express from "express";
import { createPaymentIntent, verifyPaymentSignature } from "../controllers/paymentController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.post("/create", createPaymentIntent);
router.post("/verify", verifyPaymentSignature);

export default router;

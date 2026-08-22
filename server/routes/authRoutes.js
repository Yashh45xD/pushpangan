import express from "express";
import { body } from "express-validator";
import {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  refreshToken,
  changePassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post(
  "/register",
  authLimiter,
  validate([
    body("name").notEmpty().withMessage("Full Name is required"),
    body("email").isEmail().withMessage("Must be a valid email address"),
    body("phone").matches(/^[0-9]{10}$/).withMessage("Phone number must be a valid 10 digit number"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ]),
  register
);

router.post(
  "/login",
  authLimiter,
  validate([
    body("email")
      .notEmpty()
      .withMessage("Email or mobile number is required")
      .custom((value) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isPhone = /^[0-9]{10}$/.test(value);
        if (!isEmail && !isPhone) {
          throw new Error("Must be a valid email address or 10-digit mobile number");
        }
        return true;
      }),
    body("password").notEmpty().withMessage("Password is required"),
  ]),
  login
);

router.post("/logout", protect, logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password", authLimiter, resetPassword);
router.post("/refresh-token", refreshToken);
router.put("/change-password", protect, changePassword);

export default router;

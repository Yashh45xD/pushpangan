import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, upload.single("profileImage"), updateUserProfile);

export default router;

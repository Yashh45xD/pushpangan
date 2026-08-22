import express from "express";
import { getReminders, createReminder, deleteReminder } from "../controllers/reminderController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getReminders);
router.post("/", protect, createReminder);
router.delete("/:id", protect, deleteReminder);

export default router;

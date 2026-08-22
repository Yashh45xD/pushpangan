import { Reminder } from "../models/Reminder.js";

// @desc    Get user reminders
// @route   GET /api/reminders
export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user.id, isActive: true }).sort({ eventDate: 1 });
    res.status(200).json({ success: true, reminders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create event reminder
// @route   POST /api/reminders
export const createReminder = async (req, res) => {
  try {
    const { reminderType, eventName, eventDate, notifyDaysBefore, notes } = req.body;

    const reminder = await Reminder.create({
      user: req.user.id,
      reminderType,
      eventName,
      eventDate,
      notifyDaysBefore: notifyDaysBefore || 3,
      notes: notes || "",
    });

    res.status(201).json({ success: true, reminder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete event reminder
// @route   DELETE /api/reminders/:id
export const deleteReminder = async (req, res) => {
  try {
    await Reminder.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.status(200).json({ success: true, message: "Reminder removed." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

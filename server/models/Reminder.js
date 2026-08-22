import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reminderType: {
      type: String,
      enum: ["birthday", "anniversary", "wedding", "ganesh_festival", "diwali", "corporate_event"],
      required: true,
    },
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    notifyDaysBefore: {
      type: Number,
      default: 3,
    },
    notes: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Reminder = mongoose.model("Reminder", reminderSchema);

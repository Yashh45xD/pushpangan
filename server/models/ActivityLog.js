import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    adminName: {
      type: String,
      default: "System Admin",
    },
    action: {
      type: String,
      required: true, // "LOGIN", "CREATE_PRODUCT", "UPDATE_ORDER", etc.
    },
    module: {
      type: String,
      default: "General", // "Products", "Orders", "Customers", "Settings"
    },
    details: {
      type: String,
      default: "",
    },
    ipAddress: {
      type: String,
      default: "127.0.0.1",
    },
    device: {
      type: String,
      default: "Desktop / Browser",
    },
  },
  {
    timestamps: true,
  }
);

export const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    offerType: {
      type: String,
      enum: ["Festival Offer", "Today's Special", "Weekend Offer", "Combo Offer", "Bulk Discount", "Flash Sale"],
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    bannerImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "disabled"],
      default: "active",
    },
    applicableCategory: {
      type: String,
      default: "All Categories",
    },
  },
  {
    timestamps: true,
  }
);

export const Offer = mongoose.model("Offer", offerSchema);

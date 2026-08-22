import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    websiteName: {
      type: String,
      default: "Pushpangan Fresh Flowers",
    },
    logoUrl: {
      type: String,
      default: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=200",
    },
    bannerUrl: {
      type: String,
      default: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=1200",
    },
    businessName: {
      type: String,
      default: "Pushpangan Flower eCommerce Pvt Ltd",
    },
    gstNumber: {
      type: String,
      default: "27AAAAA0000A1Z5",
    },
    email: {
      type: String,
      default: "contact@pushpangan.com",
    },
    phone: {
      type: String,
      default: "+91 98765 43210",
    },
    address: {
      type: String,
      default: "Market Yard, Gultekdi, Pune, Maharashtra 411037",
    },
    facebook: { type: String, default: "https://facebook.com/pushpangan" },
    instagram: { type: String, default: "https://instagram.com/pushpangan" },
    whatsapp: { type: String, default: "+919876543210" },
    shippingCharges: { type: Number, default: 50 },
    freeShippingThreshold: { type: Number, default: 499 },
    deliveryRadiusKm: { type: Number, default: 25 },
    emailProvider: { type: String, default: "SMTP" },
    smtpHost: { type: String, default: "smtp.mailtrap.io" },
    smsGateway: { type: String, default: "Twilio" },
  },
  {
    timestamps: true,
  }
);

export const Settings = mongoose.model("Settings", settingsSchema);

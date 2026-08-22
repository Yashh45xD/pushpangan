import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountPercentage: { type: Number, required: true, min: 1, max: 100 },
    maxDiscountAmount: { type: Number, default: 1000 },
    minPurchaseAmount: { type: Number, default: 0 },
    expiryDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    linkUrl: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, default: "General" },
  },
  { timestamps: true }
);

const newsletterSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    isResolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "Happy Customer" },
    avatar: { type: String, default: "" },
    rating: { type: Number, default: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export const Coupon = mongoose.model("Coupon", couponSchema);
export const Banner = mongoose.model("Banner", bannerSchema);
export const FAQ = mongoose.model("FAQ", faqSchema);
export const Newsletter = mongoose.model("Newsletter", newsletterSchema);
export const Contact = mongoose.model("Contact", contactSchema);
export const Testimonial = mongoose.model("Testimonial", testimonialSchema);

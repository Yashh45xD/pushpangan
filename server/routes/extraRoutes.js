import express from "express";
import {
  applyCoupon,
  createCoupon,
  getBanners,
  createBanner,
  getFAQs,
  subscribeNewsletter,
  submitContact,
  getTestimonials,
} from "../controllers/extraController.js";
import { Coupon, Banner, FAQ, Newsletter, Contact, Testimonial } from "../models/ExtraModels.js";
import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/role.js";
import { sendResponse } from "../utils/sendResponse.js";

const router = express.Router();

// ─── Coupon ──────────────────────────────────────────────────────────────────
router.post("/coupon/apply", protect, applyCoupon);
router.post("/coupon", protect, adminOnly, createCoupon);
router.get("/coupons", protect, adminOnly, async (req, res, next) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, true, "Coupons fetched", coupons);
  } catch (e) { next(e); }
});
router.delete("/coupon/:id", protect, adminOnly, async (req, res, next) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    return sendResponse(res, 200, true, "Coupon deleted");
  } catch (e) { next(e); }
});

// ─── Banners ─────────────────────────────────────────────────────────────────
router.get("/banners", getBanners);
router.post("/banner", protect, adminOnly, createBanner);
router.put("/banner/:id", protect, adminOnly, async (req, res, next) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return sendResponse(res, 200, true, "Banner updated", banner);
  } catch (e) { next(e); }
});
router.delete("/banner/:id", protect, adminOnly, async (req, res, next) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    return sendResponse(res, 200, true, "Banner deleted");
  } catch (e) { next(e); }
});

// ─── FAQ ─────────────────────────────────────────────────────────────────────
router.get("/faqs", getFAQs);
router.post("/faq", protect, adminOnly, async (req, res, next) => {
  try {
    const faq = await FAQ.create(req.body);
    return sendResponse(res, 201, true, "FAQ created", faq);
  } catch (e) { next(e); }
});
router.put("/faq/:id", protect, adminOnly, async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return sendResponse(res, 200, true, "FAQ updated", faq);
  } catch (e) { next(e); }
});
router.delete("/faq/:id", protect, adminOnly, async (req, res, next) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    return sendResponse(res, 200, true, "FAQ deleted");
  } catch (e) { next(e); }
});

// ─── Newsletter ──────────────────────────────────────────────────────────────
router.post("/newsletter/subscribe", subscribeNewsletter);
router.get("/newsletter/subscribers", protect, adminOnly, async (req, res, next) => {
  try {
    const subscribers = await Newsletter.find({ isActive: true }).sort({ createdAt: -1 });
    return sendResponse(res, 200, true, "Subscribers fetched", subscribers);
  } catch (e) { next(e); }
});
router.delete("/newsletter/:id", protect, adminOnly, async (req, res, next) => {
  try {
    await Newsletter.findByIdAndDelete(req.params.id);
    return sendResponse(res, 200, true, "Subscriber removed");
  } catch (e) { next(e); }
});

// ─── Contact Us ──────────────────────────────────────────────────────────────
router.post("/contact", submitContact);
router.get("/contacts", protect, adminOnly, async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, true, "Contact submissions fetched", contacts);
  } catch (e) { next(e); }
});
router.put("/contact/:id/resolve", protect, adminOnly, async (req, res, next) => {
  try {
    const c = await Contact.findByIdAndUpdate(req.params.id, { isResolved: true }, { new: true });
    return sendResponse(res, 200, true, "Marked as resolved", c);
  } catch (e) { next(e); }
});

// ─── Testimonials ─────────────────────────────────────────────────────────────
router.get("/testimonials", getTestimonials);
router.post("/testimonial", protect, adminOnly, async (req, res, next) => {
  try {
    const t = await Testimonial.create(req.body);
    return sendResponse(res, 201, true, "Testimonial created", t);
  } catch (e) { next(e); }
});
router.delete("/testimonial/:id", protect, adminOnly, async (req, res, next) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    return sendResponse(res, 200, true, "Testimonial deleted");
  } catch (e) { next(e); }
});

export default router;

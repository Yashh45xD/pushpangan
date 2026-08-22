import { Coupon, Banner, FAQ, Newsletter, Contact, Testimonial } from "../models/ExtraModels.js";
import { sendResponse } from "../utils/sendResponse.js";

// Coupon APIs
export const applyCoupon = async (req, res, next) => {
  try {
    const { code, cartAmount } = req.body;
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

    if (!coupon || new Date() > coupon.expiryDate) {
      return sendResponse(res, 400, false, "Invalid or expired coupon code");
    }

    if (cartAmount < coupon.minPurchaseAmount) {
      return sendResponse(res, 400, false, `Minimum purchase amount of ₹${coupon.minPurchaseAmount} required`);
    }

    const discount = Math.min(Math.round((cartAmount * coupon.discountPercentage) / 100), coupon.maxDiscountAmount);
    return sendResponse(res, 200, true, "Coupon applied successfully", { code: coupon.code, discount });
  } catch (error) {
    next(error);
  }
};

export const createCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.create(req.body);
    return sendResponse(res, 201, true, "Coupon created", coupon);
  } catch (error) {
    next(error);
  }
};

// Banner APIs
export const getBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find({ isActive: true });
    return sendResponse(res, 200, true, "Banners fetched", banners);
  } catch (error) {
    next(error);
  }
};

export const createBanner = async (req, res, next) => {
  try {
    const banner = await Banner.create(req.body);
    return sendResponse(res, 201, true, "Banner created", banner);
  } catch (error) {
    next(error);
  }
};

// FAQ APIs
export const getFAQs = async (req, res, next) => {
  try {
    const faqs = await FAQ.find();
    return sendResponse(res, 200, true, "FAQs fetched", faqs);
  } catch (error) {
    next(error);
  }
};

// Newsletter API
export const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;
    let sub = await Newsletter.findOne({ email });

    if (!sub) {
      sub = await Newsletter.create({ email });
    }

    return sendResponse(res, 200, true, "Subscribed to newsletter successfully", sub);
  } catch (error) {
    next(error);
  }
};

// Contact Us API
export const submitContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    return sendResponse(res, 201, true, "Message sent successfully", contact);
  } catch (error) {
    next(error);
  }
};

// Testimonials API
export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find();
    return sendResponse(res, 200, true, "Testimonials fetched", testimonials);
  } catch (error) {
    next(error);
  }
};

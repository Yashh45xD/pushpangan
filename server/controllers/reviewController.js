import Review from "../models/Review.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { sendResponse } from "../utils/sendResponse.js";

// Helper function to update product average rating
const updateProductRating = async (productId) => {
  const reviews = await Review.find({ product: productId });
  const numReviews = reviews.length;
  const rating = numReviews > 0 ? reviews.reduce((acc, item) => item.rating + acc, 0) / numReviews : 0;

  await Product.findByIdAndUpdate(productId, {
    rating: Math.round(rating * 10) / 10,
    numReviews,
  });
};

export const addReview = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;

    // Check if user has purchased this product
    const hasPurchased = await Order.findOne({
      user: req.user._id,
      "orderItems.product": productId,
      orderStatus: "Delivered",
    });

    if (!hasPurchased && req.user.role !== "admin") {
      return sendResponse(res, 403, false, "Only verified buyers can review products once delivered.");
    }

    const existingReview = await Review.findOne({ user: req.user._id, product: productId });
    if (existingReview) {
      return sendResponse(res, 400, false, "You have already reviewed this product.");
    }

    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating,
      comment,
      isVerifiedBuyer: Boolean(hasPurchased),
    });

    await Product.findByIdAndUpdate(productId, { $push: { reviews: review._id } });
    await updateProductRating(productId);

    return sendResponse(res, 201, true, "Review added successfully", review);
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findOne({ _id: req.params.id, user: req.user._id });

    if (!review) {
      return sendResponse(res, 404, false, "Review not found or unauthorized");
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save();

    await updateProductRating(review.product);

    return sendResponse(res, 200, true, "Review updated", review);
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return sendResponse(res, 404, false, "Review not found");
    }

    if (review.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return sendResponse(res, 403, false, "Not authorized to delete this review");
    }

    const productId = review.product;
    await review.deleteOne();

    await Product.findByIdAndUpdate(productId, { $pull: { reviews: review._id } });
    await updateProductRating(productId);

    return sendResponse(res, 200, true, "Review deleted");
  } catch (error) {
    next(error);
  }
};

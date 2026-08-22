import User from "../models/User.js";
import { sendResponse } from "../utils/sendResponse.js";

// @desc    Get user profile
// @route   GET /api/users/profile
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("addresses")
      .populate("wishlist")
      .populate("orders");

    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    return sendResponse(res, 200, true, "User profile retrieved", user);
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;

    if (req.file) {
      user.profileImage = req.file.path;
    } else if (req.body.profileImage) {
      user.profileImage = req.body.profileImage;
    }

    await user.save();
    return sendResponse(res, 200, true, "Profile updated successfully", user);
  } catch (error) {
    next(error);
  }
};

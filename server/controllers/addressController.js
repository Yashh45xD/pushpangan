import Address from "../models/Address.js";
import User from "../models/User.js";
import { sendResponse } from "../utils/sendResponse.js";

export const getAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    return sendResponse(res, 200, true, "Addresses retrieved", addresses);
  } catch (error) {
    next(error);
  }
};

export const addAddress = async (req, res, next) => {
  try {
    const { fullName, phone, street, city, state, pincode, landmark, addressType, isDefault } = req.body;

    if (isDefault) {
      await Address.updateMany({ user: req.user._id }, { isDefault: false });
    }

    const addressCount = await Address.countDocuments({ user: req.user._id });

    const address = await Address.create({
      user: req.user._id,
      fullName,
      phone,
      street,
      city,
      state,
      pincode,
      landmark,
      addressType,
      isDefault: isDefault || addressCount === 0,
    });

    await User.findByIdAndUpdate(req.user._id, { $push: { addresses: address._id } });

    return sendResponse(res, 201, true, "Address added successfully", address);
  } catch (error) {
    next(error);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const { isDefault } = req.body;

    if (isDefault) {
      await Address.updateMany({ user: req.user._id }, { isDefault: false });
    }

    const address = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!address) {
      return sendResponse(res, 404, false, "Address not found");
    }

    return sendResponse(res, 200, true, "Address updated", address);
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const address = await Address.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!address) {
      return sendResponse(res, 404, false, "Address not found");
    }

    await User.findByIdAndUpdate(req.user._id, { $pull: { addresses: address._id } });

    return sendResponse(res, 200, true, "Address deleted");
  } catch (error) {
    next(error);
  }
};

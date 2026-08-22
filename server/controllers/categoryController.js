import Category from "../models/Category.js";
import { sendResponse } from "../utils/sendResponse.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true });
    return sendResponse(res, 200, true, "Categories retrieved", categories);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, description, image } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const existing = await Category.findOne({ slug });
    if (existing) {
      return sendResponse(res, 400, false, "Category already exists");
    }

    const category = await Category.create({ name, slug, description, image });
    return sendResponse(res, 201, true, "Category created successfully", category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { name, description, image, isActive } = req.body;
    let updateData = { description, image, isActive };

    if (name) {
      updateData.name = name;
      updateData.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }

    const category = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!category) {
      return sendResponse(res, 404, false, "Category not found");
    }

    return sendResponse(res, 200, true, "Category updated", category);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return sendResponse(res, 404, false, "Category not found");
    }
    return sendResponse(res, 200, true, "Category deleted");
  } catch (error) {
    next(error);
  }
};

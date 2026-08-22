import Product from "../models/Product.js";
import Category from "../models/Category.js";
import { APIFeatures } from "../utils/apiFeatures.js";
import { sendResponse } from "../utils/sendResponse.js";

// @desc    Get all products with searching, filtering, sorting, pagination
// @route   GET /api/products
export const getProducts = async (req, res, next) => {
  try {
    const features = new APIFeatures(Product.find().populate("category", "name slug"), req.query)
      .search(["name", "description", "color"])
      .filter()
      .sort()
      .paginate();

    const products = await features.query;
    
    // Count query for metadata pagination
    const totalCountFeatures = new APIFeatures(Product.find(), req.query)
      .search(["name", "description", "color"])
      .filter();
    const total = await totalCountFeatures.query.countDocuments();

    return sendResponse(res, 200, true, "Products retrieved successfully", products, {
      total,
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 12,
      pages: Math.ceil(total / (parseInt(req.query.limit, 10) || 12)),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name slug")
      .populate({
        path: "reviews",
        populate: { path: "user", select: "name profileImage" },
      });

    if (!product) {
      return sendResponse(res, 404, false, "Product not found");
    }

    return sendResponse(res, 200, true, "Product details retrieved", product);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product (Admin)
// @route   POST /api/products
export const createProduct = async (req, res, next) => {
  try {
    let images = req.body.images || [];

    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.path);
    }

    if (images.length === 0) {
      images = ["https://images.unsplash.com/photo-1561181286-d3fee7d55364"];
    }

    const product = await Product.create({
      ...req.body,
      images,
    });

    return sendResponse(res, 201, true, "Product created successfully", product);
  } catch (error) {
    next(error);
  }
};

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return sendResponse(res, 404, false, "Product not found");
    }

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => file.path);
      req.body.images = [...(req.body.existingImages || product.images), ...newImages];
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return sendResponse(res, 200, true, "Product updated successfully", product);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return sendResponse(res, 404, false, "Product not found");
    }

    await product.deleteOne();
    return sendResponse(res, 200, true, "Product deleted successfully");
  } catch (error) {
    next(error);
  }
};

// @desc    Get Featured, Best Seller, Seasonal & Recommended Flowers
// @route   GET /api/products/special/featured
export const getSpecialProducts = async (req, res, next) => {
  try {
    const featured = await Product.find({ featured: true }).limit(8);
    const bestSeller = await Product.find({ bestSeller: true }).limit(8);
    const seasonal = await Product.find({ seasonal: true }).limit(8);

    return sendResponse(res, 200, true, "Special products retrieved", {
      featured,
      bestSeller,
      seasonal,
    });
  } catch (error) {
    next(error);
  }
};

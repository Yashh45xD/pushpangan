import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter flower name"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Please enter flower slug"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please specify a category"],
    },
    description: {
      type: String,
      required: [true, "Please enter flower description"],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: [true, "Please enter flower price"],
      min: [0, "Price cannot be negative"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount percentage cannot exceed 100"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter available stock"],
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    unit: {
      type: String,
      default: "Bunch",
      trim: true,
    },
    color: {
      type: String,
      required: [true, "Please specify flower color"],
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating minimum is 0"],
      max: [5, "Rating maximum is 5"],
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    seasonal: {
      type: Boolean,
      default: false,
    },
    bestSeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for discounted price calculation
productSchema.virtual("discountedPrice").get(function () {
  if (this.discount && this.discount > 0) {
    return Math.round(this.price * (1 - this.discount / 100));
  }
  return this.price;
});

productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

export const Product = mongoose.model("Product", productSchema);
export default Product;

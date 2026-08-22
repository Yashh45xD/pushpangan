export class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search(fields = ["name", "description", "category", "color"]) {
    if (this.queryString.search) {
      const keyword = this.queryString.search;
      const searchConditions = fields.map((field) => ({
        [field]: { $regex: keyword, $options: "i" },
      }));
      this.query = this.query.find({ $or: searchConditions });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering for price, rating, stock etc (e.g. gte, gt, lte, lt)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const parsedQuery = JSON.parse(queryStr);

    // Handle array / comma-separated filters like color=red,blue or category=roses
    if (parsedQuery.category && typeof parsedQuery.category === "string" && parsedQuery.category.includes(",")) {
      parsedQuery.category = { $in: parsedQuery.category.split(",") };
    }
    if (parsedQuery.color && typeof parsedQuery.color === "string" && parsedQuery.color.includes(",")) {
      parsedQuery.color = { $in: parsedQuery.color.split(",") };
    }
    if (parsedQuery.availability === "in_stock") {
      parsedQuery.stock = { $gt: 0 };
    }

    this.query = this.query.find(parsedQuery);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      let sortBy = this.queryString.sort;
      if (sortBy === "price_low_high") sortBy = "price";
      else if (sortBy === "price_high_low") sortBy = "-price";
      else if (sortBy === "newest") sortBy = "-createdAt";
      else if (sortBy === "popularity") sortBy = "-rating";
      else sortBy = sortBy.split(",").join(" ");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 12;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

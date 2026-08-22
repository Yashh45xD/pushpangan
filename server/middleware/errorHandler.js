import { sendResponse } from "../utils/sendResponse.js";

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error("Global Error Caught:", err);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with ID of ${err.value}`;
    return sendResponse(res, 404, false, message);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    return sendResponse(res, 400, false, message);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message).join(", ");
    return sendResponse(res, 400, false, message);
  }

  // MongoDB unavailable
  if (
    err.name === "MongoNetworkError" ||
    err.message?.includes("topology") ||
    err.message?.includes("MongoNetworkError") ||
    err.message?.includes("buffering timed out")
  ) {
    return sendResponse(res, 503, false, "Server database is currently unavailable. Please try again later.");
  }

  return sendResponse(
    res,
    error.statusCode || 500,
    false,
    error.message || "Server Error"
  );
};

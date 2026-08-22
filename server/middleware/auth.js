import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendResponse } from "../utils/sendResponse.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return sendResponse(res, 401, false, "Not authorized to access this route. Token missing.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "pushpangan_jwt_super_secret_key_2026");
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return sendResponse(res, 401, false, "User belonging to this token no longer exists.");
    }

    next();
  } catch (error) {
    return sendResponse(res, 401, false, "Not authorized, token validation failed or expired.");
  }
};

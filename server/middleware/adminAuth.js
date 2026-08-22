import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";
import { User } from "../models/User.js";

// Verify Admin Token Middleware
export const protectAdmin = async (req, res, next) => {
  try {
    let token = req.cookies?.adminJwt || req.cookies?.jwt;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in to access the Admin Panel.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "pushpangan_jwt_super_secret_key_2026"
    );

    // Try finding admin in Admin collection first, then User collection
    let admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      const user = await User.findById(decoded.id);
      if (user && user.role === "admin") {
        admin = {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: "super_admin",
          permissions: [
            "view_only",
            "edit",
            "delete",
            "create",
            "manage_orders",
            "manage_products",
            "manage_users",
            "manage_settings",
            "manage_admins",
          ],
          avatar: user.profileImage,
        };
      }
    }

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid session or admin account not found.",
      });
    }

    if (admin.status === "blocked" || admin.status === "suspended") {
      return res.status(403).json({
        success: false,
        message: "Your admin account has been suspended or blocked. Contact the Super Admin.",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Session expired or invalid token. Please log in again.",
      error: error.message,
    });
  }
};

// Role Authorization Middleware
export const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ success: false, message: "Unauthorized access." });
    }

    const userRole = req.admin.role;

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole) && userRole !== "super_admin") {
      return res.status(403).json({
        success: false,
        message: `Access denied. Action requires one of the following roles: ${allowedRoles.join(", ")}`,
      });
    }

    next();
  };
};

// Permission Check Middleware
export const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ success: false, message: "Unauthorized access." });
    }

    if (req.admin.role === "super_admin") {
      return next();
    }

    const permissions = req.admin.permissions || [];
    if (!permissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        message: `Permission denied. Missing required permission: ${permission}`,
      });
    }

    next();
  };
};

// In-Memory Rate Limiting Tracker for Login Protection
const loginTracker = new Map();

export const loginAttemptLimiter = (req, res, next) => {
  const ip = req.ip || req.headers["x-forwarded-for"] || "127.0.0.1";
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes window
  const maxAttempts = 5;

  const record = loginTracker.get(ip) || { count: 0, resetTime: now + windowMs };

  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + windowMs;
  }

  if (record.count >= maxAttempts) {
    const minutesLeft = Math.ceil((record.resetTime - now) / 60000);
    return res.status(429).json({
      success: false,
      message: `Too many failed login attempts from this IP. Please try again in ${minutesLeft} minute(s).`,
      locked: true,
      retryAfterMinutes: minutesLeft,
    });
  }

  req.loginTrackerIp = ip;
  req.loginTrackerRecord = record;
  next();
};

export const recordFailedAttempt = (ip) => {
  if (!ip) return;
  const now = Date.now();
  const record = loginTracker.get(ip) || { count: 0, resetTime: now + 15 * 60 * 1000 };
  record.count += 1;
  loginTracker.set(ip, record);
};

export const clearFailedAttempts = (ip) => {
  if (!ip) return;
  loginTracker.delete(ip);
};

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import { apiLimiter } from "./middleware/rateLimiter.js";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import extraRoutes from "./routes/extraRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import userAccountRoutes from "./routes/userAccountRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";

dotenv.config();

const app = express();

// ─── CORS — dynamically allow production + Vercel preview origins ─────────────
const allowedOrigins = [
  // Production frontends
  "https://blossom-bridge-app-gold.vercel.app",
  "https://pushpangan.vercel.app",
  "https://pushpanganweb.vercel.app",
  // Local development
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:8080",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (server-to-server, curl, Postman, mobile)
    if (!origin) return callback(null, true);
    // Explicitly allowed origins
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Allow any Vercel preview/branch deployment (e.g. my-app-git-main-xyz.vercel.app)
    if (origin.endsWith(".vercel.app")) return callback(null, true);
    // Reject everything else
    console.warn(`[CORS] Blocked origin: ${origin}`);
    return callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  exposedHeaders: ["Set-Cookie"],
};

// Handle preflight for ALL routes
app.options("*", cors(corsOptions));
// Apply CORS to ALL routes
app.use(cors(corsOptions));

// ─── Security Middlewares ─────────────────────────────────────────────────────
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// ─── Root & Health Check (before DB middleware so they always respond) ────────
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    service: "Pushpangan Backend API",
    version: "2.0.0",
    health: "/health",
    api: "/api",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    service: "Pushpangan Backend API",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    mongodb_uri_set: !!process.env.MONGODB_URI,
    jwt_secret_set: !!process.env.JWT_SECRET,
  });
});

// ─── Request Parsing & Logging (before DB so parsing is always ready) ─────────
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// ─── Lazy DB Connection Middleware (serverless-safe — no top-level await) ──
let dbConnected = false;
app.use(async (req, res, next) => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (err) {
      console.error("[DB] Connection failed:", err.message);
      // Explicitly set CORS header on error responses so the browser
      // reports the real error (DB failure) rather than a CORS block.
      const origin = req.headers.origin;
      if (origin && (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app"))) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Credentials", "true");
      }
      return res.status(500).json({
        success: false,
        message: "Database connection failed. Please try again shortly.",
      });
    }
  }
  next();
});

// ─── Global Rate Limiter ──────────────────────────────────────────────────────
app.use("/api", apiLimiter);

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", extraRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/account", userAccountRoutes);
app.use("/api/reminders", reminderRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

export default app;
